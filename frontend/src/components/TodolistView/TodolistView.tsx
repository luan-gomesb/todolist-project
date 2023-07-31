
import { MouseEventHandler } from "react";
import { Item } from "../../../pages/api/todos/Todolist";
import styles from "./TodolistView.module.css";

type props = {
	children?: React.ReactNode;
	item: Item;
	ontoggle: (MouseEventHandler<HTMLSpanElement>);
	ondelete: (MouseEventHandler<HTMLSpanElement>);
}

export default function TodolistView(props: props) {
	const { item, ondelete, ontoggle } = props;
	return (
		<div key={item.id} className={item.done ? styles.itemdone : ""}>
			<div>
				<span>{item.id} - </span>
				<span data-key={item.id} onClick={e => ontoggle(e)}>
					{item.description} - {item.done.toString()}
				</span>{" "}
				-{" "}
				<span
					onClick={ondelete}
					data-key={item.id}
					style={{ display: "inline-block" }}
				>
					X
				</span>
			</div>
		</div>
	)
}
