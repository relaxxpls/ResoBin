import { Filter, X } from '@styled-icons/heroicons-outline'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import { useResponsive } from 'hooks'
import { selectDropdownStatus, updateDropdownStatus } from 'store/userSlice'

const FilterFloatButton = () => {
  const [Icon, setIcon] = useState(Filter)
  const { isDesktop } = useResponsive()
  const dropdownStatus = useSelector(selectDropdownStatus)
  const dispatch = useDispatch()

  // ? show or hide dropdown filters state
  const toggleFilter = () => dispatch(updateDropdownStatus(!dropdownStatus))

  // ? dropdown disabled on wide screens
  useEffect(() => {
    if (isDesktop) {
      dispatch(updateDropdownStatus(false))
      setIcon(null)
    } else {
      setIcon(dropdownStatus ? X : Filter)
    }
  }, [dropdownStatus, isDesktop, dispatch])

  return (
    Icon && (
      <IconContainer onClick={toggleFilter}>
        <Icon size="1.5rem" />
      </IconContainer>
    )
  )
}

export default FilterFloatButton

const IconContainer = styled.div`
  position: fixed;
  right: 2rem;
  bottom: 1.5rem;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  height: 3.5rem;
  color: white;
  background: ${({ theme }) => theme.logo};
  border-radius: 50%;
  box-shadow: 0 0 0.7rem rgb(0 0 0 / 60%);
  cursor: pointer;
`
