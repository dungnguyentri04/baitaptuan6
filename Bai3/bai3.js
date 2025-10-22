        

        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        const productItems = document.querySelectorAll('.product-item');

        // Hàm tìm kiếm 
        function searchProducts() {
            // Lấy từ khóa tìm kiếm 
            const keyword = searchInput.value.toLowerCase().trim();
            
            let hasResults = false;

            // Duyệt qua tất cả sản phẩm
            productItems.forEach(function(product) {
                // Lấy tên sản phẩm
                const productName = product.querySelector('.product-name').textContent.toLowerCase();
                
                // Kiểm tra tên có chứa từ khóa không
                if (productName.includes(keyword)) {
                    // Hiển thị sản phẩm
                    product.style.display = '';
                    hasResults = true;
                } else {
                    // Ẩn sản phẩm
                    product.style.display = 'none';
                }
            });

            // Hiển thị thông báo nếu không tìm thấy kết quả
            let noResultsMsg = document.querySelector('.no-results');
            if (!hasResults && keyword !== '') {
                if (!noResultsMsg) {
                    noResultsMsg = document.createElement('div');
                    noResultsMsg.className = 'no-results';
                    noResultsMsg.textContent = 'Khong thay sam pham "' + keyword + '"';
                    document.getElementById('products').appendChild(noResultsMsg);
                }
            } else if (noResultsMsg) {
                noResultsMsg.remove();
            }
        }

        searchBtn.addEventListener('click', searchProducts);

        searchInput.addEventListener('keyup', function(event) {
            // Nếu nhấn Enter, thực hiện tìm kiếm
            if (event.key === 'Enter') {
                searchProducts();
            }
            // Hoặc tìm kiếm khi gõ
            searchProducts();
        });
        
        // Lấy các phần tử
        const addProductBtn = document.getElementById('addProductBtn');
        const addProductForm = document.getElementById('addProductForm');

        // Gắn sự kiện click cho nút "Thêm sản phẩm"
        addProductBtn.addEventListener('click', function() {
            // Toggle class "hidden" để ẩn/hiện form
            addProductForm.classList.toggle('hidden');
            
            // Thay đổi text của nút
            if (addProductForm.classList.contains('hidden')) {
                addProductBtn.textContent = ' Thêm sản phẩm';
            } else {
                addProductBtn.textContent = ' Đóng ';
                // Cuộn đến form
                addProductForm.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });

        // XỬ LÝ SUBMIT FORM 
        
        addProductForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Lấy giá trị từ form
            const productName = document.getElementById('productName').value;
            const productDescription = document.getElementById('productDescription').value;
            const productPrice = document.getElementById('productPrice').value;
            const productImage = document.getElementById('productImage').value || 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=250&fit=crop';

            
            // Biến kiểm tra validation
            let isValid = true;


            
            
            
            // Tạo sản phẩm mới
            const newProduct = document.createElement('article');
            newProduct.className = 'product-item';
            newProduct.innerHTML = `
                <img src="${productImage}" alt="${productName}">
                <h3 class="product-name">${productName}</h3>
                <p>${productDescription}</p>
                <p class="price">${parseInt(productPrice).toLocaleString('vi-VN')}đ</p>
            `;

            // Thêm sản phẩm vào danh sách
            document.getElementById('products').appendChild(newProduct);

            // Reset form
            addProductForm.reset();

            // Ẩn form
            addProductForm.classList.add('hidden');
            addProductBtn.textContent = ' Thêm sản phẩm';


            // Cập nhật lại danh sách sản phẩm 
            const updatedProductItems = document.querySelectorAll('.product-item');
            productItems.length = 0;
            updatedProductItems.forEach(item => {
                Array.prototype.push.call(productItems, item);
            });
        });
