import { productTypes } from '@/types/product.types';
import Image from 'next/image';
import React from 'react'

export default function Products({ products, auth }: any) {

    const [category, setCategory] = React.useState([]);
    const [showModel, setShowModel] = React.useState(false);
    const [currentProduct, setCurrentProduct] = React.useState<any>({});
    const [image, setImage] = React.useState<any>(currentProduct.thumbnail);


    React.useEffect(() => {

        fetch('https://dummyjson.com/products/categories')
            .then(res => res.json())
            .then((data) => {
                setCategory(data)
            });
    }, [])
    const handleUpdateFunction = (product: productTypes) => {

        setCurrentProduct(product)
        setShowModel(true)
    }

    const RenderUpdateModel = () => {
        const [productInfo, setProductInfo] = React.useState<productTypes>({
            title: currentProduct.title,
            brand: currentProduct.brand,
            category: currentProduct.category,
            description: currentProduct.description,
            // discountPercentage: "",
            price: currentProduct.price,
            thumbnail: currentProduct.thumbnail

        })
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
            setImage(e.target.files[0])

        }

        const handleUpdateProduct = (e: any) => {
            e.preventDefault()
            let updatedProduct = {
                ...productInfo,
                thumbnail: image ? image : productInfo.thumbnail
            }
            // console.log(updatedProduct)
            fetch(`https://dummyjson.com/products/${currentProduct.id}`, {
                method: 'PUT', /* or PATCH */
                headers: { 'Content-Type': 'application/json', "Authenticate": `Bearer ${auth.token}` },
                body: JSON.stringify(updatedProduct)
            }).then(res => res.json())
            .then(console.log);
            setProductInfo({ })
            setImage('');

        }
        return (
            <div id="updateProductModal" className={` ${showModel == true ? "  " : " hidden "} bg-black bg-opacity-40 fixed  overflow-y-auto overflow-x-hidden mx-auto z-50  w-full md:inset-0 h-modal md:h-full`}>
            <div className="relative mx-auto p-4 w-full max-w-2xl h-full md:h-auto">
                    {/* <!-- Modal content --> */}
                    <div className=" p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
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
                        <form action="#">
                            <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                    <input onChange={handleInputEvent} type="text" name="title" id="title" value={productInfo.title} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500" placeholder="Ex. Apple iMac 27&ldquo;" />
                                </div>
                                <div>
                                    <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
                                    <input onChange={handleInputEvent} type="text" name="brand" id="brand" value={productInfo.brand} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500" placeholder="Ex. Apple" />
                                </div>
                                <div>
                                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                    <input onChange={handleInputEvent} type="number" value={productInfo.price} name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500" placeholder="Rs299" />
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
                                    <input onChange={handleImageEvent} type="file" name="image" id="image" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500" placeholder="Rs299" />
                                </div>
                                <div>
                                 
                                    {
                                        productInfo.thumbnail &&
                                        <div className="img">
                                            <Image width={200} height={200} alt="selected img" src={
                                                image?.name ? URL.createObjectURL(image) :  productInfo.thumbnail 
                                            } 
                                                />
                                        </div>
                                    }
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                    <textarea name='description' onChange={handleInputEvent} id="description" defaultValue={productInfo.description} rows={5} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-slate-500 focus:border-slate-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500" placeholder="Write a description..." />
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <button type="submit" onClick={handleUpdateProduct} className="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800">
                                    Update product
                                </button>
                               
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
    const handleDeleteFunction = (id: any) => {
        let isConfirm = confirm("are you sure want to delete?")
        if (isConfirm == true) {
            fetch(`https://dummyjson.com/products/${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + auth.token
                }
            })
                .then(res => res.json())
                .then(console.log);
        } else {
            return
        }
    }
    return (
        <div>

            {

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Product name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    brand
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Category
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.products ? products.products.map((product: any) => {
                                    return (

                                        <tr key={product.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {product.title}
                                            </th>
                                            <td className="px-6 py-4">
                                                {product.brand}
                                            </td>
                                            <td className="px-6 py-4">
                                                {product.category}
                                            </td>
                                            <td className="px-6 py-4">
                                                {product.price}
                                            </td>
                                            <td className="px-6 py-4 flex justify-around items-center">
                                                <span onClick={() => handleUpdateFunction(product)} className="font-medium cursor-pointer text-blue-600 dark:text-blue-500 hover:text-blue-700">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                    </svg>

                                                </span>
                                                <span onClick={() => handleDeleteFunction(product.id)} className="font-medium cursor-pointer hover:text-red-600 text-red-600 dark:text-red-500 hover:underline">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                                    </svg>

                                                </span>
                                            </td>
                                        </tr>
                                    )
                                }) : <tr><th>
                                    Loading....</th></tr>

                            }

                        </tbody>
                    </table>
                </div>

            }

            <RenderUpdateModel />
        </div>
    )
}
