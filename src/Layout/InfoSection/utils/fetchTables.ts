export function fetchTableStatuses() {
    return fetch('http://localhost:3001/tables')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        });
}