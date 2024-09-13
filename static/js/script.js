// Функция для получения и обновления списка продуктов
function fetchProducts() {
    fetch('/api/products/')
        .then(response => response.json())
        .then(data => {
            const productTableBody = document.getElementById('productTableBody');
            productTableBody.innerHTML = '';
            data.forEach(product => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${product.name}</td>
                    <td>${product.description}</td>
                    <td>${product.price}</td>
                `;
                productTableBody.appendChild(row);
            });
        });
}

// Обработчик формы для добавления продукта
document.getElementById('productForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;

    fetch('/api/products/create/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description, price })
    })
    .then(response => response.json())
    .then(data => {
        fetchProducts(); // Обновляем список продуктов
        document.getElementById('productForm').reset(); // Очищаем форму
    })
    .catch(error => console.error('Error:', error));
});

// Загружаем продукты при загрузке страницы
window.onload = fetchProducts;
