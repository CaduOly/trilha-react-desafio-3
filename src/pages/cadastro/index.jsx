import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";

import {
	Container,
	Title,
	Column,
	SubtitleCadastro,
	Row,
	Wrapper,
	TitleCadastro,
	Footer,
	LinkCadastro,
} from "./styles";
import { api } from "../../services/api";
import { MdEmail, MdLock, MdPerson } from "react-icons/md";
import { Button } from "../../components/Button";
const Cadastro = () => {
	const navigate = useNavigate();

	const onSubmit = async (formData) => {
		try {
			const { data } = await api.get(
				`/users?nome=${formData.nome}&email=${formData.email}`
			);

			if (data.length && data[0].id) {
				alert("Usuário já cadastrado");
				return;
			}
			navigate("/login");
		} catch (e) {
			//TODO: HOUVE UM ERRO
		}
	};

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		reValidateMode: "onChange",
		mode: "onChange",
	});

	return (
		<>
			<Header />
			<Container>
				<Column>
					<Title>
						A plataforma para você aprender com experts, dominar as
						principais tecnologias e entrar mais rápido nas empresas
						mais desejadas.
					</Title>
				</Column>
				<Column>
					<Wrapper>
						<TitleCadastro>Comece agora grátis</TitleCadastro>
						<SubtitleCadastro>
							Crie sua conta e make the change._
						</SubtitleCadastro>
						<form onSubmit={handleSubmit(onSubmit)}>
							<Input
								placeholder="Nome"
								leftIcon={<MdPerson />}
								name="nome"
								control={control}
							/>
							{errors.email && <span>Nome é obrigatório</span>}
							<Input
								placeholder="E-mail"
								leftIcon={<MdEmail />}
								name="email"
								control={control}
							/>
							{errors.email && <span>E-mail é obrigatório</span>}
							<Input
								type="password"
								placeholder="Senha"
								leftIcon={<MdLock />}
								name="senha"
								control={control}
							/>
							{errors.senha && <span>Senha é obrigatório</span>}
							<Button
								title="Criar minha conta"
								variant="secondary"
								type="submit"
							/>
						</form>
						<Row>
							<SubtitleCadastro>
								Ao clicar em "criar minha conta grátis", declaro
								que aceito as Políticas de Privacidade e os
								Termos de Uso da DIO.
							</SubtitleCadastro>
						</Row>
						<Footer>
							Já tenho conta.
							<LinkCadastro href="/login">
								Fazer login
							</LinkCadastro>
						</Footer>
					</Wrapper>
				</Column>
			</Container>
		</>
	);
};

export { Cadastro };
