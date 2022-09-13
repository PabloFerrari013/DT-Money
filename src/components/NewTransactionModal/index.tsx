import React, { useState, FormEvent, useContext } from 'react'
import ReactModal from 'react-modal'
import {
  ButtonClose,
  Container,
  RadioButton,
  TransactionTypeContainer
} from './styles'

import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import { useTransactions } from '../../hooks/useTransactions'

type NewTransactionModalProps = {
  isOpen: boolean
  onRequestClose: () => void
}

export const NewTransactionModal = ({
  onRequestClose,
  isOpen
}: NewTransactionModalProps) => {
  const { createTransaction } = useTransactions()

  const [type, setType] = useState('deposit')
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState('')

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault()

    await createTransaction({ amount, category, title, type })

    setType('deposit')
    setTitle('')
    setAmount(0)
    setCategory('')
    onRequestClose()
  }

  return (
    <Container onSubmit={handleCreateNewTransaction}>
      <ReactModal
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
        isOpen={isOpen}
        onRequestClose={onRequestClose}
      >
        <ButtonClose onClick={onRequestClose}>
          <img src={closeImg} alt="close" />
        </ButtonClose>

        <Container>
          <h2>Cadastrar transação</h2>

          <input
            type="text"
            value={title}
            onChange={event => setTitle(event.target.value)}
            placeholder="Título"
          />

          <input
            type="number"
            value={amount}
            onChange={event => setAmount(Number(event.target.value))}
            placeholder="Valor"
          />

          <TransactionTypeContainer>
            <RadioButton
              type="button"
              isActive={type === 'deposit'}
              activeColor="green"
              onClick={() => setType('deposit')}
            >
              <img src={incomeImg} alt="Entrada" />

              <span>Entrada</span>
            </RadioButton>

            <RadioButton
              type="button"
              isActive={type === 'withdraw'}
              activeColor="red"
              onClick={() => setType('withdraw')}
            >
              <img src={outcomeImg} alt="Saída" />

              <span>Saída</span>
            </RadioButton>
          </TransactionTypeContainer>

          <input
            type="text"
            value={category}
            onChange={event => setCategory(event.target.value)}
            placeholder="Categoria"
          />

          <button type="submit">Cadastrar</button>
        </Container>
      </ReactModal>
    </Container>
  )
}
