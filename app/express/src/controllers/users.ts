import type { Request, Response, NextFunction } from 'express'
import UserService from '../services/user'

// POST /users 
export async function createUser(req: Request, res: Response, next: NextFunction) {
  const { username, email, password } = req.body

  try {
    const user = await UserService.createUser(username, email, password, 'guest')

    req.session.regenerate((err) => {
      if (err != null) return next(err)

      req.session.userId = user.id.toString()
      req.session.userRole = user.role

      req.session.save((err) => { 
        if (err != null) next(err) 
        res.status(201).json({ 
          user: { 
            id: user.id, 
            email: user.email, 
            username: user.username, 
            role: user.role 
          } 
        })
      })
    })

  } catch (error) {
    return next(error)
  }
}

// GET /users/:userId
export async function getUser(req: Request, res: Response, next: NextFunction) {
  const { userId } = req.params

  try {
    const user = await UserService.getUserById(userId)
    res.status(200).send({
      user: { 
        id: userId, 
        email: user.email, 
        username: user.username, 
        role: user.role 
      } 
    })
  } catch (error) {
    return next(error)
  }
}

// PUT /users/:userId/email
export async function changeEmail(req: Request, res: Response, next: NextFunction) {
  const { userId } = req.params
  const { email } = req.body

  try {
    await UserService.changeEmail(userId, email)
    res.status(204).send()
  } catch (error) {
    return next(error) 
  }
}

// PUT /users/:userId/username
export async function changeUsername(req: Request, res: Response, next: NextFunction) {
  const { userId } = req.params
  const { username } = req.body

  try {
    await UserService.changeUsername(userId, username)
    res.status(204).send()
  } catch (error) {
    return next(error) 
  }
}

// DELETE /users/:userId
export async function deleteUser(req: Request, res: Response, next: NextFunction) {
  const { userId } = req.params

  try {
    await UserService.deleteUserById(userId)
    res.status(204).send()
  } catch (error) {
    return next(error)
  }
}
