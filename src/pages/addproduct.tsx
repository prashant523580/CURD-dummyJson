import { productTypes } from '@/types/product.types';
import Image from 'next/image';
import React from 'react'

export default function addproduct() {
    const [showModel, setShowModel] = React.useState(false);
    const [image, setImage] = React.useState<any>();
    const [productInfo, setProductInfo] = React.useState<productTypes>({
        title: "",
        brand: '',
        category: "",
        description: "",
        // discountPercentage: "",
        price: 0,
        thumbnail: ""

    })

    const [category, setCategory] = React.useState([]);
    React.useEffect(() => {

        fetch('https://dummyjson.com/products/categories')
            .then(res => res.json())
            .then((data) => {
                setCategory(data)
            });
    }, [])


    const handleInputEvent = (e: any) => {
        const { name, value } = e.target;
        setProductInfo((pre: any) => {
            return {
                ...pre,
                [name]: value
            }
        })
    }
    const handleImageEvent = (e: any) => {
        // const handleImage = (e: any) => {
        setImage(e.target.files[0])
        //   }
    }

    const handleAddProduct = (e: any) => {
        e.preventDefault();
        // let formData = new FormData();

        // formData.append("title", `${productInfo.title}`)
        // formData.append("category", `${productInfo.category}`)
        // formData.append("price",`${ productInfo.price}`)
        // formData.append("description", `${productInfo.description}`)
        // formData.append("discountPercentage", productInfo.discountPercentage)
        // formData.append("thumbnail", image)
        

            let addData = {
                ...productInfo,
            thumbnail: image.name
        }
        // console.log(formData)
        fetch('https://dummyjson.com/products/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(addData)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        });
        setProductInfo({})
        setShowModel(false)
        alert("successfully added.")
        // console.log(addData)
    
    }
    return (
        <div className='flex justify-center flex-col w-full'>
            {/* <!-- Modal toggle --> */}

            {/* <button> </button> */}
            <div className="flex justify-center m-5">
                <button onClick={() => setShowModel(true)} id="updateProductButton" data-modal-toggle="updateProductModal" className="block text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800" type="button">
                    Add Product
                </button>
            </div>

            {/* <!-- Main modal --> */}
            <div id="updateProductModal" className={` ${showModel == true ? "  " : " hidden "} bg-black bg-opacity-40 fixed  overflow-y-auto overflow-x-hidden mx-auto z-50  w-full md:inset-0 h-modal md:h-full`}>
                <div className="relative mx-auto p-4 w-full max-w-2xl h-full md:h-auto">
                    {/* <!-- Modal content --> */}
                    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        {/* <!-- Modal header --> */}
                        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Update Product
                            </h3>
                            <button onClick={() => setShowModel(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="updateProductModal">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* <!-- Modal body --> */}
                        <form  onSubmit={handleAddProduct}>
                            <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                    <input onChange={handleInputEvent} type="text" name="title" id="title" value={productInfo.title} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500" placeholder="Ex. Apple iMac 27&ldquo;" required/>
                                </div>
                                <div>
                                    <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
                                    <input onChange={handleInputEvent} type="text" name="brand" id="brand" value={productInfo.brand} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500" placeholder="Ex. Apple" required />
                                </div>
                                <div>
                                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                    <input onChange={handleInputEvent} type="number" value={productInfo.price} name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500" placeholder="Rs299" required />
                                </div>
                                <div>
                                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                    <select onChange={handleInputEvent} id="category" name="category" value={productInfo.category} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500">
                                        <option value="">--select-here</option>
                                        {
                                            category.length > 0 &&
                                            category.map((cate) => {
                                                return <option key={cate} value={cate}>{cate}</option>
                                            })

                                        }

                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Images</label>
                                    <input onChange={handleImageEvent} type="file" name="image" id="image" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500" required />
                                </div>
                                <div>
                                    {image &&
                                        <div className="img">
                                            <Image width={200} height={200} alt="selected img" src={URL.createObjectURL(image)} />
                                        </div>
                                    }
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                    <textarea required name='description' onChange={handleInputEvent} id="description" defaultValue={productInfo.description} rows={5} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-slate-500 focus:border-slate-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500" placeholder="Write a description..." />
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <button type="submit" className="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800">
                                    add product
                                </button>
                             
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
