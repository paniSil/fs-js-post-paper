import { Router } from 'express'
import { validateUserBody, validateParamsUserId, validateUserBodyUpdate } from '../validators/userValidation.mjs'
import { getUsersHandler } from '../controllers/users/usersController.mjs'
import { postUserHandler, getUserByIdHandler, putUserByIdHandler, deleteUserByIdHandler } from '../controllers/users/userControllerSingle.mjs'


const usersRouter = Router()

usersRouter
    .route('/')
    .get(getUsersHandler)
    .post(validateUserBody, postUserHandler)

usersRouter
    .route('/:id')
    .get(validateParamsUserId, getUserByIdHandler)
    .put(validateParamsUserId, validateUserBodyUpdate, putUserByIdHandler)
    .delete(validateParamsUserId, deleteUserByIdHandler)

export default usersRouter