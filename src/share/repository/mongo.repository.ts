
import { Model, Document, Mongoose } from 'mongoose';

export class MongoRepository<
  Entity,
>  {
  constructor(private model: Model<Entity>) {
  }

  public async save(entity: Entity): Promise<Entity> {
    return await this.model.create(entity);
  }


  public async saveMany(data: Entity[]): Promise<Entity[]> {
    return await this.model.insertMany(data);
  }

  public async findOneById(id: any): Promise<Entity> {
    return await this.model.findById(id);
  }

  public async findAll(): Promise<Entity[]> {
    return await this.model.find();
  }
  public async findAllbyField(
    columnvalue: any,
    // value: string | number,
    relations?: string[],
  ): Promise<Entity[]> {
    // const whereOptions: any = {};
    // whereOptions[column] = value;
    console.log(columnvalue);
    

    const query = this.model.find(columnvalue);
    
    
    if (relations) {
      relations.map((relationColumn) => query.populate(relationColumn));
    }
    
    return await query.exec();
  }

  public async delete(colomnvalue: any): Promise<{ affected: number }> {


    const result = await this.model.deleteOne(colomnvalue);
    return { affected: result.acknowledged === true ? 1 : 0 };
  }

  public async softDelete(id: string): Promise<{ affected: number }> {
    const result = await this.model.updateOne({ _id: id });
    return { affected: result.acknowledged === true ? 1 : 0 };
  }

  public async update(query: any, dto: any): Promise<{ affected: number }> {
    console.log(query);
    console.log(dto);
    

    const result = await this.model.updateOne( query ,  dto );
    return { affected: result.acknowledged === true ? 1 : 0 };
  }

  async findOne(
    columnValue: any,
    // value: string | number,
    relations?: string[],
  ): Promise<Entity> {


    // const whereOptions: any = {};
    // whereOptions[column] = value;

    const query = this.model.findOne(columnValue);
    if (relations) {
      relations.map((relationColumn) => query.populate(relationColumn));
    }
    return await query.exec();
  }

  async push(
    id: string,
    column: string,
    value: [string], 
  ): Promise<{ affected: number }> {
    const update = {};
    update[column] = value;

    const result = await this.model.updateOne(
      { _id: id },
      { $push: { ...update } },
    );
    return { affected: result.acknowledged === true ? 1 : 0 };

  }
  
}
