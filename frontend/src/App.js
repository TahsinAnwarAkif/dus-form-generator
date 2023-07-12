import "./App.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Form } from "./components/Form";

export const App = () => {
	return (
		<div>
			<Header />
			<Form />
			<Footer />
		</div>
	);
};
