import logo from '../../assets/logo.svg';
import { Container, Content } from './styles';

interface HeaderProps{
  onOpenModalNewTransaction: ()=>void;
  onCloseModalNewTransaction: ()=>void;
}

export function Header({onOpenModalNewTransaction, onCloseModalNewTransaction}:HeaderProps){
  

  return (
    <Container>
      <Content>
        <img src={logo} alt="dt money" />
        <button type="button" onClick={onOpenModalNewTransaction}>
          Nova transação
        </button>
      </Content>
    </Container>
  );
}