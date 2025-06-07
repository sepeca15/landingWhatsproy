import ProductsSwiper from "./ProductsSwiper"
import Cart from "./Cart"
import { EmpresaResponse, Producto } from "@/types"
import { useCart } from "@/context/CartContext"
import React from "react"
import UncustomModal from "./Modal"
import InfoLineForm from "./InfoLineForm"

interface IDeliveryPage {
    empresaInfo?: EmpresaResponse
}

const DeliveryPage = ({ empresaInfo }: IDeliveryPage) => {
    const { addToCart, items, clearCart } = useCart();
    const [form, setForm] = React.useState<any>({});
    const [errors, setErrors] = React.useState<any>({});

    const [stateModalComplete, setStateModalComplete] = React.useState<boolean>(false);

    const toggleModalComplete = () => {
        setStateModalComplete((prev) => !prev)
    }

    const handleCheckout = () => {
        if (!handleValidateForm()) {
            return;
        }
        if (!empresaInfo?.data.greenApiInstance || !empresaInfo?.data.greenApiInstanceToken) {
            const newLocal = 'No se puede procesar el pedido en este momento. Por favor, intente más tarde.'
            alert(newLocal);
            return;
        }

        let fullMessage;
        if (items.length === 0) {
            fullMessage = `¡Hola! Me gustaría hacer un pedido. ¿Podrías ayudarme con el menú?`;
        } else {
            const message = items.map(item =>
                `🛍️ ${item.nombre} x${item.cantidad} - $${item.precio * item.cantidad}`
            ).join('\n');

            let infoLinesFormated = Object.keys(form).map((key) =>
                `🔹 ${key}: ${form[key]}`
            ).join('\n');

            fullMessage = `¡Hola! 😊 Me gustaría realizar el siguiente pedido:\n\n${message}\n\n📄 *Datos del pedido:*\n${infoLinesFormated}\n\n¡Muchas gracias! 🙏 Quedo atento/a a su confirmación.`;
        }

        const whatsappUrl = `https://wa.me/${empresaInfo.data.numero}?text=${encodeURIComponent(fullMessage)}`;
        window.open(whatsappUrl, '_blank');
        clearCart()
        toggleModalComplete()
        setForm({})
    };


    const handleAddToCart = (product: Producto) => {
        addToCart(product, 1);
    };

    const handleValidateForm = (): boolean => {
        let errors: any = {};

        empresaInfo?.infoLines.forEach((infoline) => {
            if (infoline) {
                if (infoline?.requerido && !form[infoline.nombre]) {
                    errors[infoline.nombre] = `El campo ${infoline.nombre} es requerido`;
                }
            }
        });

        setErrors(errors);
        return Object.keys(errors)?.length === 0;
    };

    const products = empresaInfo?.products
    console.log(empresaInfo?.data);

    return (
        <div className="w-full flex flex-col flex-1">

            <div className="relative mt-[100px] w-full z-[1px] ">
                <img
                    className="adaptativeImage opacity-[0.8] object-cover w-full"
                    src="https://st3.depositphotos.com/4590583/35791/i/450/depositphotos_357913324-stock-photo-background-food-dishes-salads-snacks.jpg"
                    alt=""
                />

                <div className='flex-1 w-full z-100 opacity-1 absolute md:top-[250px] top-[100px] pl-[12%] text-white'>
                    <p className='md:text-[50px] text-[16]'><span className='text-yellow-300'>SABORES</span> QUE UNEN</p>
                    <p className='font-extralight md:max-w-[600px] text-[16] '>Deléitate con una selección diversa de platos que representan lo mejor de cada restaurante. Comidas frescas, sabrosas y listas para disfrutar en cualquier momento.</p>
                    <div className='mt-4 flex flex-row items-center gap-[20px]'>
                        <a href="#myMenuDelivery">
                            <button className='border-[2px] hover:scale-125 transition rounded-full py-2 px-8 border-yellow-300 text-white'>Menu</button>
                        </a>

                        <button className='border-[2px] hover:scale-125 transition rounded-full py-2 px-8 border-yellow-300 text-white'>Ordenar</button>
                    </div>
                </div>
            </div>

            <div className="w-[100%] bg-transparent z-[100px] mx-auto mb-[300px] flex flex-row items-center justify-center">
                <div className='relative w-full flex flex-col items-center'>
                    <ProductsSwiper categorys={products} onAddToCart={handleAddToCart} />
                    <Cart onCheckout={toggleModalComplete} />
                </div>

            </div>
            {
                stateModalComplete &&
                <UncustomModal
                    isOpen={stateModalComplete}
                    onClose={toggleModalComplete}
                    title="Completa el formulario"
                    handleComplete={handleCheckout}
                >
                    <InfoLineForm
                        errors={errors}
                        value={form}
                        infoLines={empresaInfo?.infoLines}
                        setValue={(val: any) => {
                            setForm((prev: any) => ({
                                ...prev,
                                ...val
                            }))
                        }}
                    />
                </UncustomModal>
            }
        </div>
    )
}


export default DeliveryPage