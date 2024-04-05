export function fetchDrinks() {
    return fetch('http://localhost:3001/drinks')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        })
}