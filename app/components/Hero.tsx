import { products } from '@/utils/constants'
import Image from 'next/image'
import React from 'react'
import ProductCard from './ProductCard'

const Hero: React.FC = () => {
    return (
        <>
        {products.map((product) => {
            return <ProductCard key={product.id} title={product.title} dec={product.desc} src={product.src} price={product.price} />
        })}

        </>
    )
}

export default Hero
