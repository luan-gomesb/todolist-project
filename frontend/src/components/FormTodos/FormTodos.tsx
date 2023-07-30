import { useState } from "react";

type FormError = {
	status: boolean;
	message: string;
}
export type FormTodosData = {
	description: string
}

type FormTodosProps = {
	onFormSubmit: (data: FormTodosData) => void;
	clearAfterSubmit: boolean;
}

const FormTodos = (props: FormTodosProps) => {
	let { onFormSubmit, clearAfterSubmit } = props;
	const [description, setDescription] = useState<string>("");
	const [error, setError] = useState<FormError>();
	const handleSubmit = (e: React.KeyboardEvent<HTMLFormElement>) => {
		e.preventDefault();
		//console.log(e.target.todo.value);
		if (validadeForm())
			onFormSubmit?.({ description });
		if (clearAfterSubmit)
			clear();
	};

	const validadeForm = (): boolean => {
		let todoIsValid = description != "";
		let message = "";
		if (!todoIsValid)
			message = "Task description cant be empty";

		setError(() => ({ status: todoIsValid, message }))
		return todoIsValid;
	}
	const clear = () => {
		setDescription(() => "")
	}
	return (
		<div className="form-group" >
			<form onSubmit={handleSubmit}>
				{!error?.status && (
					<div className="text-danger">{error?.message}</div>
				)}
				<label htmlFor="todo" className="form-label">Adicionar tarefas</label>
				<input
					className="form-control"
					type="text"
					name="todo"
					id="todo"
					value={description}
					onChange={(e) => setDescription(() => e.target.value)}
				/>
			</form>
		</div>
	)
}

export default FormTodos;
