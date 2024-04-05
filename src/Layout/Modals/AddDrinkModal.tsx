import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { DrinkType } from "./types"
import { fetchDrinks } from "./utils/fetchDrinks"
import { useModalOverlayContext } from '../../Context/ModalOverlayContext'
import { useSelectedTableContext } from '../../Context/SelectedTableContext'
import { addDrink } from './utils/addDrink'


export function AddDrinkModal() {
    const queryClient = useQueryClient()

    const { data: drinks, error, isLoading } = useQuery<DrinkType[]>({
        queryFn: fetchDrinks,
        queryKey: ['drinks']
    })

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error fetching drinks</div>
    }

    const [selectedDrink, setSelectedDrink] = useState<DrinkType | null>(null)

    const { closeModal, isModalOpen } = useModalOverlayContext()
    const { selectedTableId, selectTable } = useSelectedTableContext()

    // console.log(selectedTableId, typeof (selectedTableId))

    const handleDrinkChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = event.target.value

        const selectedDrink = drinks?.find(drink => drink.id === selectedId)
        setSelectedDrink(selectedDrink || null)
    }


    const addDrinkMutation = useMutation({
        mutationFn: addDrink,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tables"] })
        },
    })

    const handleConfirm = async () => {
        try {
            await addDrinkMutation.mutateAsync({ selectedTableId, selectedDrink })

            selectTable(null)
        } catch (err) {
            console.log("Error adding drink:", err)
        }
        closeModal()
        setSelectedDrink(null)
    }


    const handleCancel = () => {
        closeModal()
        setSelectedDrink(null)
    }




    return (
        isModalOpen ? (
            <div className="add-drink-modal">
                <h3>Select a drink:</h3>
                <select name="drink" id="drink" onChange={handleDrinkChange}>
                    <option disabled selected>Choose drink</option>
                    {drinks && drinks.map(drink => (
                        <option key={drink.id} value={drink.id}>{drink.name}</option>
                    ))}
                </select>
                {selectedDrink && (
                    <p className='drink-price'>Price:
                        <span> {selectedDrink ? selectedDrink.price : ''}$</span>
                    </p>
                )}
                <div className="buttons-wrap">
                    <button className="cancel-order-btn" onClick={handleCancel}>Cancel</button>
                    <button className="confirm-order-btn" onClick={handleConfirm}>Confirm</button>
                </div>
            </div>
        ) : null
    )
}