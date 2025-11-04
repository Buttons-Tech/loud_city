import Image, { StaticImageData } from 'next/image'
import React from 'react'

type ProductCardProps = {
    title: string;
    desc: string;
    src: string | StaticImageData;
    price: number;
    onBuy?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, desc, src, price, onBuy }) => {
  return (
    <>
    
            <div style={{backgroundImage: 'url(/loud.png)', backgroundPosition: 'center'}} className="max-w-[360px] my-10 mx-auto p-5 rounded-xl border border-gray-200 shadow-lg flex flex-col items-center gap-3 bg-white ">
                <h2 className="text-4xl font-black text-[#EE1F0F] tracking-wider uppercase m-0">{title}</h2>

                <p className="m-0 text-gray-900 text-center text-[14px] leading-[1.3]">
                    {desc}
                </p>

                <div
                    aria-hidden="false"
                    role="img"
                    aria-label="Prescription bottle"
                    className="flex justify-center items-center p-3"
                >
                    <Image
                        src="/skunk_red.png"
                        alt="Skunk Bottle"
                        width={200}
                        height={400}
                    />
                </div>

                <div className="flex justify-between items-center w-full mt-1 gap-3">
                    <div className="text-[18px] text-black font-extrabold">N5000</div>
                    <button
                        type="button"
                        className="bg-gray-900 text-white px-4 py-2 rounded-lg cursor-pointer font-bold"
                    >
                        BUY
                    </button>
                </div>
            </div>
    </>
  )
}

export default ProductCard
