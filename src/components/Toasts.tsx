import { Toaster, toast } from 'sonner'

const successToast = (message: string) => {
	toast.success(message)
}

const notificationToast = (message: string) => {
	toast.info(message)
}

const errorToast = (message: string = 'Hubo un error en la petición') => {
	toast.error(message)
}

export { successToast, notificationToast, errorToast, Toaster }
