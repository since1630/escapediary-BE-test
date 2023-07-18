const express = require('express');
const router = express.Router();
const { Posts } = require('../models');
const verifyToken = require("../middlewares/auth_middleware")

// 게시글 전체 조회
router.get('/', async (req, res) => {
  try {
    const posts = await Posts.findAll();
    return res.status(200).json({ posts });
    // res.status(200).send('하이');
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ errorMessage: '게시글 조회에 실패하였습니다.' });
  }
});

// 게시글 작성
router.post('/', verifyToken, async (req, res) => {
  const { title, content, roomname, star } = req.body;
  const {userId} = res.locals.user
  try {
    //! FE 내용중 하나라도 빠져있으면 에러 메시지 반환
    if (!star) {
      return res
        .status(400)
        .json({ errorMessage: '게시글 작성에 실패하였습니다.' });
    }
    // 타이틀 검증(형식)
    if (!title || title.length > 25) {
      return res
        .status(412)
        .json({ errorMessage: '게시글 제목의 형식이 일치하지 않습니다.' });
    }
    //! content의 형식이 비정상적인 경우
    if (!content || content.length > 1000) {
      return res
        .status(412)
        .json({ errorMessage: '게시글 내용의 형식이 일치하지 않습니다.' });
    }
    await Posts.create({ UserId:userId, title, content, roomname, star });
    console.log(req.cookies)
    return res.status(201).json({ message: '게시글 작성에 성공하였습니다' });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ errorMessage: '게시글 작성에 실패하였습니다.' });
  }
});

// 게시글 상세 조회
// router.get("/:postId",async (req,res)=>{
//   const {postId} = req.params;
//   try{
//     const post = await Posts.findOne({where:postId},
//       attributes:[
//         'postId',
//         'title',
//         'content',
//         'star',
//         'createdAt',
//         'updatedAt'
//       ])

//     res.json(post)
//   }
// })

module.exports = router;
