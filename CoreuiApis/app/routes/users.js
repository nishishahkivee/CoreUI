'use strict';

const express = require('express');
const userCtrl = require('../controllers/users');
const passport = require('passport');
const userAuth = passport.authenticate("jwt", { session: false });
const router = express.Router(); 
const authorizer = require('../lib/authorize');  
const { User } = require('../lib/role');

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns all Users
 *     produces:
 *       - application/json
 *     security:
 *       - token: []
 *     responses:
 *       200:
 *         description: An array of Users 
 */ 
router.post('/userData',authorizer('admin'), userCtrl.getUsers)

/**
 * @swagger
 * /api/users:
 *   post:
 *    tags:
 *      - Users
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: item
 *        schema:
 *         type: object
 *         properties:
 *           name:      
 *             type: string
 *           email:    
 *             type: string
 *           mobile:  
 *             type: number 
 *           role:
 *             type: string
 *           password:
 *             type: string
 *           required:
 *             - name
 *             - email
 *             - mobile 
 *             - password 
 *    responses:
 *       '200':
 *         description: OK
 *       '409':
 *         description: Duplicate entry'
 */
router.post('/register',userCtrl.createUser); 

 /**
 * @swagger
 * /api/users/search:
 *    get:
 *     tags:
 *       - Users
 *     description: search a string
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: User's name
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully search
 */
router.get('/search',userCtrl.search);

/**
 * @swagger
 * /api/users/{id}:
 *    delete:
 *     tags:
 *       - Users
 *     description: Deletes a single User
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: User's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete('/:id', userCtrl.deleteUser);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *    tags:
 *      - Users
 *    produces:
 *      - application/json 
 *    parameters:
 *      - name: id
 *        in: path
 *        type: string
 *        required: true*      
 *      - in: body
 *        name: item
 *        schema:
 *         type: object 
 *         properties:
 *           name:      
 *             type: string
 *           email:    
 *             type: string
 *           mobile:  
 *             type: number 
 *           role:
 *             type: string
 *           required:
 *             - name
 *             - email
 *             - mobile   
 *    responses:
 *       '200':
 *         description: OK
 *       '409':
 *         description: Duplicate entry'
 */
 router.put('/:id',userCtrl.updateUser);

/**
 * @swagger
 * /api/Users/{id}:
*   get:
*     tags:
*       - Users
*     description: Update a new User
*     produces:
*       - application/json*    
*     parameters:
*       - name: id
*         description: Users's id
*         in: path
*         required: true
*         type: string
*     responses:
*       200:
*         description: Successfully created
*/
router.get("/:id",userCtrl.getUserById); 

/**
* @swagger
* /api/Users/login:
*   post:
*     tags:
*       - Users
*     description: Login User
*     produces:
*       - application/json*    
*     parameters:
*       - in: body
*         name: item
*         schema:
*           type: object
*           properties:    
*              email:
*                type: string
*              password:
*                type: string
*     responses:
*       200:
*         description: Successfully created
*/
router.post("/login", async (req, res) => {
  await userCtrl.loginUser(req , res);
});

/**
*  @swagger
*  /api/users/profile:
*    post:
*     tags:
*        - Users
*     summary: Checks if the server is alive
*     produces:
*        - application/json
*     security:
*       - token: []
*     responses:
*          200:
*            description: Successfully created
*/
router.post("/profile" ,userAuth, async (req, res) => {
  return res.json(userCtrl.serializeUser(req.user));
});

router.post('/limit', async (req,res) => {
  await userCtrl.getdata(req,res);
});


router.post('/logout', function(req, res){
  req.logout();
  res.json("logged out success")
  res.redirect('/');
});

module.exports = router;
