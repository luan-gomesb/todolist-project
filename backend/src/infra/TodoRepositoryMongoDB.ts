import TodoRepository, { ItemFind } from "./TodoRepository";
import mongoose, {
	isObjectIdOrHexString,
	Model,
	Schema,
	Types,
} from "mongoose";
import { Item } from "../entitites/Todoslist";

export default class TodoRepositoryMongoDB implements TodoRepository {
	todoScheme: Schema<Item>;
	todoModel: Model<Item>;
	constructor(host: string) {
		mongoose.connect(`mongodb://${host}:27017/todolistdb`);
		this.todoScheme = new Schema<Item>({
			description: { type: String, required: true },
			done: { type: Boolean, required: true },
		});

		this.todoModel = mongoose.model<Item>("todos", this.todoScheme);
	}

	async findById(id: string): Promise<Item | null> {
		console.log("id buscado", id);
		let isValid = mongoose.Types.ObjectId.isValid(id);
		if (!isValid) return null;

		return await this.todoModel.findById(id).exec();
	}

	async list(): Promise<Item[]> {
		const items = await this.todoModel.find();
		return items.map((item) => {
			return {
				id: item._id.toString(),
				description: item.description,
				done: item.done,
			} as Item;
		});
	}
	async save(item: Item): Promise<Item> {
		const todoItem = new this.todoModel(item);
		return await todoItem.save();
	}
	async update(item: Item): Promise<boolean> {
		const ret = await this.todoModel.updateOne(
			{ _id: item.id },
			{ done: item.done }
		);
		return ret.acknowledged;
	}
	async find(param: ItemFind): Promise<Item[]> {
		return await this.todoModel.find(param);
	}
	async remove(id: string): Promise<boolean> {
		// const response =  await this.todoModel.findByIdAndDelete(id);
		let isValid = mongoose.Types.ObjectId.isValid(id);
		if (!isValid) return false;
		const response = await this.todoModel.deleteOne({ _id: id });
		return response.acknowledged;
	}
	async close() {
		mongoose.connection.close();
	}
	isValid(id: string) {
		return mongoose.Types.ObjectId.isValid(id);
	}
}
