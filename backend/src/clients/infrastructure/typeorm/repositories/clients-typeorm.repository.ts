import { ClientsModel } from "@/clients/domain/models/clients.model";
import {
  ClientsRepository,
  CreateClientsProps,
} from "@/clients/repositories/clients.repository";
import { ConflictError } from "@/common/domain/errors/conflict-error";
import { NotFoundError } from "@/common/domain/errors/not-found-error";
import {
  SearchInput,
  SearchOutput,
} from "@/common/domain/repositories/repository.interface";
import { inject, injectable } from "tsyringe";
import { ILike, Repository } from "typeorm";

@injectable()
export class ClientsTypeormRepository implements ClientsRepository {
  sortableFields: string[] = ["name", "created_at"];

  constructor(
    @inject("ClientsDefaultTypeormRepository")
    private clientsRepository: Repository<ClientsModel>
  ) {}

  create(props: CreateClientsProps): ClientsModel {
    return this.clientsRepository.create(props);
  }

  async insert(model: ClientsModel): Promise<ClientsModel> {
    return this.clientsRepository.save(model);
  }

  async findById(id: string): Promise<ClientsModel> {
    return this._get(id);
  }

  async update(model: ClientsModel): Promise<ClientsModel> {
    await this._get(model.id);

    await this.clientsRepository.update({ id: model.id }, model);

    return model;
  }

  async delete(id: string): Promise<void> {
    await this._get(id);

    await this.clientsRepository.delete(id);
  }

  async search(props: SearchInput): Promise<SearchOutput<ClientsModel>> {
    const validSort = this.sortableFields.includes(props.sort) || false;
    const dirOps = ["asc", "desc"];
    const validSortDir =
      (props.sort_dir && dirOps.includes(props.sort_dir.toLowerCase())) ||
      false;
    const orderByField = validSort ? props.sort : "created_at";
    const orderByDir = validSortDir ? props.sort_dir : "desc";
    const [users, total] = await this.clientsRepository.findAndCount({
      ...(props.filter && {
        where: {
          name: ILike(props.filter),
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

  async conflictingCPF(cpf: string): Promise<void> {
    const client = await this.clientsRepository.findOneBy({ cpf });

    if (client) {
      throw new ConflictError("There is already a client using this CPF");
    }
  }

  protected async _get(id: string): Promise<ClientsModel> {
    const client = await this.clientsRepository.findOneBy({ id });

    if (!client) {
      throw new NotFoundError(`Client not found using ID: ${id}`);
    }

    return client;
  }
}
