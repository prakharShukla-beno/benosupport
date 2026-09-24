"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo, 
  useState,
  type ReactNode,
} from "react"
import ProposalFormModal from "@/components/ProposalFormModal"

type ProposalModalContextValue = {
  isOpen: boolean
  openProposalModal: () => void
  closeProposalModal: () => void
}

const ProposalModalContext = createContext<ProposalModalContextValue | null>(
  null
)

export function ProposalModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openProposalModal = useCallback(() => setIsOpen(true), [])
  const closeProposalModal = useCallback(() => setIsOpen(false), [])

  const value = useMemo(
    () => ({ isOpen, openProposalModal, closeProposalModal }),
    [isOpen, openProposalModal, closeProposalModal]
  )

  return (
    <ProposalModalContext.Provider value={value}>
      {children}
      <ProposalFormModal isOpen={isOpen} onClose={closeProposalModal} />
    </ProposalModalContext.Provider>
  )
}

export function useProposalModal(): ProposalModalContextValue {
  const context = useContext(ProposalModalContext)
  if (!context) {
    throw new Error(
      "useProposalModal must be used within a ProposalModalProvider"
    )
  }
  return context
}
