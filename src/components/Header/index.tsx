import React from 'react'
import { Container, Content } from './styles'

import logoImg from '../../assets/logo.svg'

type HeaderProps = {
  onOpenNewTransactionModal: () => void
}

export const Header = ({ onOpenNewTransactionModal }: HeaderProps) => {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dt money" />

        <button onClick={onOpenNewTransactionModal}>Nova transação</button>
      </Content>
    </Container>
  )
}
