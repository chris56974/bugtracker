import { Router } from 'express'
import { param, body } from 'express-validator'
import { validateInput, isActive, isAuthenticated, isProjectMemberOrAdmin, projectExists, projectCommentExists } from '../../middleware'
import * as ProjectCommentController from '../../controllers/project'

const router = Router()

// project comments
router.get('/projects/:projectId/comments', 
  isAuthenticated, 
  isActive,
  param('projectId').isInt().withMessage('Project ID must be an integer'),
  validateInput,
  isProjectMemberOrAdmin,
  ProjectCommentController.getProjectComments
)

router.post('/projects/:projectId/comments', 
  isAuthenticated,
  isActive,
  [
    param('projectId').isInt().withMessage('Project ID must be an integer'),
    body('comment').isString().isLength({ min: 1, max: 500 }).withMessage('Project comment must be a string of 1-500 characters')
  ],
  validateInput,
  projectExists,
  isProjectMemberOrAdmin,
  ProjectCommentController.createProjectComment
)

router.put('/projects/:projectId/comments/:commentId', 
  isAuthenticated, 
  isActive,
  [
    param('projectId').isInt().withMessage('Project ID must be an integer'),
    param('commentId').isInt().withMessage('Comment ID must be an integer'),
    body('comment').isString().isLength({ min: 1, max: 500 }).withMessage('Project comment must be a string of 1-500 characters')
  ],
  validateInput,
  projectExists,
  projectCommentExists,
  isProjectMemberOrAdmin,
  ProjectCommentController.updateProjectComment
)

router.delete('/projects/:projectId/comments/:commentId', 
  isAuthenticated, 
  isActive,
  [
    param('projectId').isInt().withMessage('Project ID must be an integer'),
    param('commentId').isInt().withMessage('Comment ID must be an integer'),
  ],
  validateInput,
  projectExists,
  projectCommentExists,
  isProjectMemberOrAdmin,
  ProjectCommentController.deleteProjectComment
)

export default router