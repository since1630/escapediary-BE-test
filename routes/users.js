const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/auth_middleware");

// 회원가입
router.post("/signup", async (req, res) => {
  const { id, password, confirm } = req.body;
  try {
    // 값이 다 있는지 확인부터
    if (!id || !password || !confirm) {
      return res
        .status(412)
        .json({ message: "닉네임과 비밀번호를 모두 입력해주세요." });
    }

    // id 길이 확인
    if (id.length < 5 || id.length > 15) {
      return res.status(412).json({ message: "id는 5에서 15글자 입니다." });
    }

    // 정규식 검사(알파벳과 숫자)
    if (!/^[a-z0-9]+$/.test(id)) {
      return res.status(412).json({
        message: "id는 알파벳 소문자와 숫자로만 구성되어야 합니다.",
      });
    }

    // password 길이 확인
    if (password.length < 6 || password.length > 12) {
      return res.status(412).json({
        message: "비밀번호는 6자 이상 12자 이하 입니다.",
      });
    }

    // 정규식 검사(알파벳과 숫자)
    if (!/^[a-z0-9]+$/.test(password)) {
      return res.status(412).json({
        message: "비밀번호는 알파벳 소문자와 숫자로만 구성되어야 합니다.",
      });
    }

    // 비밀번호=confirm
    if (password !== confirm) {
      return res.status(412).json({
        message: "비밀번호가 일치하지 않습니다.",
      });
    }

    // id 유니크
    const existUser = await Users.findOne({where:{ id }});
    console.log(existUser)
    if (existUser) {
      return res.status(412).json({ message: "중복된 id 입니다." });
    }

    // 회원 가입
    await Users.create({ id, password });
    return res.status(201).json({ message: "회원가입에 성공하였습니다." });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: "요청한 데이터 형식이 올바르지 않습니다." });
  }
});

// 로그인
router.post("/login", async (req, res) => {
  const { id, password } = req.body;

  try {
    // id 비밀번호 확인
    if (!id || !password) {
      return res
        .status(400)
        .json({ message: " id와 비밀번호를 확인해주세요." });
    }

    // id를 찾고
    const existUser = await Users.findOne({ id, password });
    if (!existUser) {
      return res
        .status(412)
        .json({ message: "id 또는 비밀번호가 일치하지 않습니다." });
    }

    // 토큰 발급
    const token = jwt.sign({ id: existUser.id }, "my-secret-key");

    // cookie로 저장
    res.cookie("Authorization", `Bearer ${token}`);
    return res.status(200).json({ message: "로그인에 성공했습니다." });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "로그인에 실패하였습니다." });
  }
});

// user 정보 받는 라우터 하나(verify 쓰고)
router.get("/", verifyToken, (req, res) => {
  try {
    const user = res.locals.user;
    return res.status(200).json({ data: {id : user.id} });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: "유저 정보를 불러오지 못했습니다." });
  }
});
 

module.exports = router;
