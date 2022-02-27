const cart = function ()
{
    const cartBtn = document.querySelector('.button-cart')
    const cart = document.getElementById('modal-cart')
    const closeBtn = cart.querySelector('.modal-close')
    const goodsConteiner = document.querySelector('.long-goods-list')

    const deleteCartItem = () =>
    {
        const cart = JSON.parse(localstorage.getItem('cart'))

        const newCart = cart.filter(good =>
        {
            return good.id !== id
        })

        localstorage.setItem('cart', JSON.stringify(cart))
        renderCartGoods(JSON.parse(localStorage.getItem('cart')))
    }
    const plusCartItem = () =>
    {
        const cart = JSON.parse(localstorage.getItem('cart'))

        const newCart = cart.map(good =>
        {
            if (good.id === id)
            {
                good.count++
            } else
            {
                return good
            }
        })

        localstorage.setItem('cart', JSON.stringify(newCart))
        renderCartGoods(JSON.parse(localStorage.getItem('cart')))
    }
    const minusCartItem = () =>
    {
        const cart = JSON.parse(localstorage.getItem('cart'))

        const newCart = cart.map(good =>
        {
            if (good.id === id)
            {
                if (good.count > 0)
                {
                    good.count--
                }
            } else
            {
                return good
            }
        })

        localstorage.setItem('cart', JSON.stringify(newCart))
        renderCartGoods(JSON.parse(localStorage.getItem('cart')))
    }


    const addToCart = (id) =>
    {
        const goods = JSON.parse(localstorage.getItem('goods'))
        const clickedGood = goods.find(good => good.id === id);
        const cart = localstorage.getItem('cart') ? JSON.parse(localstorage.getItem('cart')) : []

        if (cart.some(good => good.id === clickedGood.id))
        {
            cart.map(good =>
            {
                if (good.id === clickedGood.id)
                {
                    good.count++
                } else
                {
                    return good
                }
            })
        } else
        {
            clickedGood.count = 1
            cart.push(clickedGood)
        }
        localstorage.setItem('cart', JSON.stringify(newCart))
    }

    const renderCartGoods = (goods) =>
    {
        cartTable.innerHTML = ''
        goods.foreach(good =>
        {
            const tr = document.createElement('tr')
            tr.innerHTML = `
                <td>${good.name}</td>
						<td>$${good.price}</td>
						<td><button class="cart-btn-minus"">-</button></td>
						<td>${good.count}</td>
						<td><button class=" cart-btn-plus"">+</button></td>
						<td>${good.price * good.count}</td>
						<td><button class="cart-btn-delete"">x</button></td>
            `
            cartTable.append(tr)

            tr.addEventListener('click', (e) =>
            {
                if (e.target.classList.contains('cart-btn-minus')) 
                {
                    minusCartItem(good.id)
                } else if (e.target.classList.contains('cart-btn-plus'))
                {
                    plusCartItem(good.id)
                } else if (e.target.classList.contains('cart-btn-delete'))
                {
                    deleteCartItem(good.id)
                }
            })
        })
    }
    const sendForm = () =>
    {
        const cartArray = localStorage.getItem('cart') ? JSON.parse(localstorage.getItem('cart')) : []

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(cartArray)
        }).then(() =>
        {
            cart.style.display = "";
        })
    }

    modalForm.addEventListener('submit', (e) =>
    {
        e.preventDefault()
        sendForm()
    })

    cartBtn.addEventListener("click", function ()
    {
        const cartArray = localstorage.getItem('cart') ? JSON.parse(localstorage.getItem('cart')) : []
        renderCartGoods(cartArray)
        cart.style.display = "flex";
    })

    closeBtn.addEventListener("click", function ()
    {
        cart.style.display = "";
    })
    cart.addEventListener('click', (event) =>
    {
        if (!event.target.closest('.modal') && event.target.classlist.contains("overlay"))
        {
            cart.style.display = ''
        }
    })

    if (goodsConteiner)
    {
        goodsConteiner.addEventListener('click', (event) =>
        {
            if (event.target.closest('.add-to-cart'))
            {
                const btnToCart = event.target.closest('.add-to-cart')
                const goodId = btnToCart.dataset.id

                addToCart(goodId)
            }
        })
    }
}
cart();