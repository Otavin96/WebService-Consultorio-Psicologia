import { NotFoundError } from "@/common/domain/errors/not-found-error";
import {
  SearchInput,
  SearchOutput,
} from "@/common/domain/repositories/repository.interface";
import { ConsultationModel } from "@/consultation/domain/models/consultation.model";
import {
  ConsultationsRepository,
  CreateConsultationProps,
} from "@/consultation/repositories/consultation.repository";
import { inject, injectable } from "tsyringe";
import { ILike, Repository } from "typeorm";

@injectable()
export class ConsultationTypeormRepository implements ConsultationsRepository {
  constructor(
    @inject("ConsultationDefaultTypeormRepository")
    private consultationsRepository: Repository<ConsultationModel>
  ) {}

  sortableFields: string[] = ["created_at"];

  create(props: CreateConsultationProps): ConsultationModel {
    return this.consultationsRepository.create(props);
  }

  async insert(model: ConsultationModel): Promise<ConsultationModel> {
    return this.consultationsRepository.save(model);
  }

  async findById(id: string): Promise<ConsultationModel> {
    return this._get(id);
  }

  async update(model: ConsultationModel): Promise<ConsultationModel> {
    await this._get(model.id); // Verifica se a consulta existe

    // Utiliza 'save' para garantir que todas as propriedades da entidade sejam atualizadas corretamente
    await this.consultationsRepository.save(model); // save faz update se a entidade já existir

    // Retorna a versão persistida da consulta após a atualização
    return await this._get(model.id);
  }

  async delete(id: string): Promise<void> {
    await this._get(id);

    await this.consultationsRepository.delete(id);
  }

  async findAllByProfessionalId(
    professionalId: string
  ): Promise<ConsultationModel[]> {
    return this.consultationsRepository.find({
      where: { professional: { id: professionalId } },
      relations: {
        scheduling: { client: true },
      },
      order: { created_at: "DESC" },
    });
  }

  async search(props: SearchInput): Promise<SearchOutput<ConsultationModel>> {
    const validSort = this.sortableFields.includes(props.sort) || false;
    const dirOps = ["asc", "desc"];
    const validSortDir =
      (props.sort_dir && dirOps.includes(props.sort_dir.toLowerCase())) ||
      false;
    const orderByField = validSort ? props.sort : "created_at";
    const orderByDir = validSortDir ? props.sort_dir : "desc";
    const [users, total] = await this.consultationsRepository.findAndCount({
      ...(props.filter && {
        where: {
          scheduling: ILike(props.filter),
        },
      }),
      order: {
        [orderByField]: orderByDir,
      },
      skip: (props.page - 1) * props.per_page,
      take: props.per_page,
    });
    return {
      items: users,
      per_page: props.per_page,
      total,
      current_page: props.page,
      sort: props.sort,
      sort_dir: props.sort_dir,
      filter: props.filter,
    };
  }

  protected async _get(id: string): Promise<ConsultationModel> {
    const consultation = await this.consultationsRepository.findOne({
      where: { id },
      relations: {
        scheduling: {
          client: true,
        },
      },
    });

    if (!consultation) {
      throw new NotFoundError(`Consultation not found using ID: ${id}`);
    }

    return consultation;
  }
}
