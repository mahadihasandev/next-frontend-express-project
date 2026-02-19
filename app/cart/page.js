import CartComponent from '@/components/CartComponent'
import Container from '@/components/Container'


const Cart = async() => {
const data=await fetch(`${process.env.NEXT_PUBLIC_API}/api/v1/product/viewaddtocart`)
const posts=await data.json()
console.log(posts);



  return (
    <Container>
        <CartComponent cartData={posts}/>
    </Container>
  )
}

export default Cart

