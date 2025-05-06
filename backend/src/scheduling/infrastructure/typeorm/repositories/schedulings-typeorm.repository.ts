import { NotFoundError } from "@/common/domain/errors/not-found-error";
import {
  SearchInput,
  SearchOutput,
} from "@/common/domain/repositories/repository.interface";
import { SchedulingModel } from "@/scheduling/domain/models/scheduling.model";
import {
  CreateSchedulingProps,
  SchedulingsRepository,
} from "@/scheduling/repositories/SchedulingsRepository";
import { inject, injectable } from "tsyringe";
import { ILike, Repository } from "typeorm";

@injectable()
export class SchedulingsTyperomRepository implements SchedulingsRepository {
  constructor(
    @inject("SchedulingsDefaultTypeormRepository")
    private schedulingsRepository: Repository<SchedulingModel>
  ) {}

  sortableFields: string[] = ["created_at"];

  create(props: CreateSchedulingProps): SchedulingModel {
    return this.schedulingsRepository.create(props);
  }

  async insert(model: SchedulingModel): Promise<SchedulingModel> {
    await this.schedulingsRepository.insert(model);

    return model;
  }

  async findById(id: string): Promise<SchedulingModel> {
    return this._get(id);
  }

  async update(model: SchedulingModel): Promise<SchedulingModel> {
    await this._get(model.id);

    await this.schedulingsRepository.update(model.id, model);

    return model;
  }

  async delete(id: string): Promise<void> {
    await this._get(id);

    await this.schedulingsRepository.delete(id);
  }

  async getAllSchedulingByClient(
    clientId: string,
    props: SearchInput
  ): Promise<SearchOutput<SchedulingModel>> {
    const validSort = this.sortableFields.includes(props.sort) || false;
    const dirOps = ["asc", "desc"];
    const validSortDir =
      (props.sort_dir && dirOps.includes(props.sort_dir.toLowerCase())) ||
      false;

    const orderByField = validSort ? props.sort : "created_at";
    const orderByDir = validSortDir ? props.sort_dir : "desc";

    const where: any = {
      client: {
        id: clientId,
      },
    };

    // Se tiver filtro, aplica no nome do cliente (ou outro campo desejado)
    if (props.filter) {
      where.client.name = ILike(`%${props.filter}%`);
    }

    const [schedulings, total] = await this.schedulingsRepository.findAndCount({
      where,
      relations: ["client"],
      order: {
        [orderByField]: orderByDir,
      },
      skip: (props.page - 1) * props.per_page,
      take: props.per_page,
    });

    return {
      items: schedulings,
      per_page: props.per_page,
      total,
      current_page: props.page,
      sort: props.sort,
      sort_dir: props.sort_dir,
      filter: props.filter,
    };
  }

  async search(props: SearchInput): Promise<SearchOutput<SchedulingModel>> {
    const validSort = this.sortableFields.includes(props.sort) || false;
    const dirOps = ["asc", "desc"];
    const validSortDir =
      (props.sort_dir && dirOps.includes(props.sort_dir.toLowerCase())) ||
      false;
    const orderByField = validSort ? props.sort : "created_at";
    const orderByDir = validSortDir ? props.sort_dir : "desc";
    const [schedulings, total] = await this.schedulingsRepository.findAndCount({
      ...(props.filter && {
        where: {
          client: ILike(props.filter),
        },
      }),
      relations: ["client"],
      order: {
        [orderByField]: orderByDir,
      },
      skip: (props.page - 1) * props.per_page,
      take: props.per_page,
    });
    return {
      items: schedulings,
      per_page: props.per_page,
      total,
      current_page: props.page,
      sort: props.sort,
      sort_dir: props.sort_dir,
      filter: props.filter,
    };
  }

  protected async _get(id: string): Promise<SchedulingModel> {
    const client = await this.schedulingsRepository.findOne({
      where: { id },
      relations: ["client"],
    });

    if (!client) {
      throw new NotFoundError(`Scheduling not found using ID: ${id}`);
    }

    return client;
  }
}
