interface IBaseRepository<Entity, Response> {
  create(item: Entity, city_id?: string): Promise<void>;
  save(item: Entity): Promise<void>;
  delete(id: string): Promise<void>;
  list(name?: string): Promise<Response[]>;
  findById(id: string): Promise<Entity>;
  findByIdRender(id: string): Promise<Response>;
}

export { IBaseRepository };
