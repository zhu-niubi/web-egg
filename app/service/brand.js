'use strict';

const Service = require('egg').Service;
const axios = require('axios');

class BrandService extends Service {



  generateVerificationCode() {
    const codeLength = 6;
    const min = Math.pow(10, codeLength - 1);
    const max = Math.pow(10, codeLength) - 1;
    const verificationCode = Math.floor(Math.random() * (max - min + 1)) + min;
    return verificationCode.toString();
  }

  async sendCode(phoneNumber) {
    const { ctx } = this;
    console.log('G_code',this.config.code)
    const code = this.config.code
    if ( code[phoneNumber] == undefined || code[phoneNumber] == null || code[phoneNumber] == '' ){
      const verificationCode = this.generateVerificationCode();
      console.log('code',verificationCode);
      code[phoneNumber] = verificationCode;

       // 单位是毫秒
      try {
        const response = await axios.post(
          `https://dapr.nlxos.com/invoke/api/method/sms/vcode?apikey=nkdsms&phone=${phoneNumber}&vcode=${verificationCode}`
        );

        if (response.status === 200) {
          setTimeout(() => {
            delete code[phoneNumber];
          }, 60 * 1000);

          return {
            success: true,
            msg: '验证码发送成功'
          };
        } else {
          return {
            success: false,
            msg: '验证码发送失败'
          };
        }
      } catch (error) {
        console.error('Error sending verification code:', error);
        return {
          success: false,
          msg: '验证码发送失败'
        };
      }
    } else {
      return {
        success: false,
        msg: '验证码发送频繁'
      };
    }




  }

  async postCustomer(data){
    const { ctx } = this;

    const { name, gender , code, address } = data;
    // const phone = parseInt(data.phone);


    if (name.length === 0) {
      return{
        type: 1,
        success: false,
        msg: '请填写您的姓氏'
      }
    }

    if (address.length === 0) {
      return{
        type: 2,
        success: false,
        msg: '请填写您的地址'
      }
    }

    let phone;


    if ( code && data.phone ){
      phone = parseInt(data.phone)
      const phoneRegex = /^[1][3-9][0-9]{9}$/;
      if (!phoneRegex.test(phone)) {
        return{
          type: 3,
          success: false,
          msg: '请填写正确的手机号'
        }
      }
      const G_code = this.config.code
      if (  G_code[phone] != code ){
        return{
          type: 4,
          success: false,
          msg: '验证码错误'
        }
      }
    }else {
      return {
        type: 5,
        success: false,
        msg: '缺少验证码或手机号'
      }
    }

    const postData = data;

    const partnerData  = {
      phone,
      dflag: 0
    }

    const result = await ctx.model.Partner.findOne(partnerData);
    // console.log(result._doc._id)
    if (result?._doc._id){
      const res = await ctx.model.Partner.findByIdAndUpdate(result._doc._id,postData,{ new: true,});
      console.log( 'res',res )
      if ( res._doc ){
        return {
          type: 6,
          success: true,
          msg: '保存成功'
        }

      }else {
        return {
          type: 6,
          success: false,
          msg: '提交失败'
        }
      }
    }

    const res = await ctx.model.Partner.create(postData);

    console.log('res',res)
    if ( res._doc ){
      return {
        type: 6,
        success: true,
        msg: '保存成功'
      }

    }else {
      return {
        type: 6,
        success: false,
        msg: '提交失败'
      }
    }

  }

}

module.exports = BrandService;
