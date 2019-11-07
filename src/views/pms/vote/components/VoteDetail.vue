<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="vote" :rules="rules" ref="voteFrom" label-width="150px">
      <el-form-item label="投票主题：" :rules="[
      { required: true, message: '请输入投票主题', trigger: 'blur' },
       { min: 4, max: 50, message: '长度在 4 到 50 个字符', trigger: 'blur' }]" prop="voteTitle">
        <el-input v-model="vote.voteTitle"></el-input>
      </el-form-item>
      <el-form-item label="封面：" :rules="[
      { required: true, message: '请上传封面', trigger: 'blur' }]" prop="voteBanner">
        <single-upload v-model="vote.voteBanner"></single-upload>
      </el-form-item>
      
      <el-form-item label="是否开放报名：" :rules="[
      { required: true, message: '请选择是否开放报名', trigger: 'blur' }]" prop="isOpenSignup">
        <el-radio-group v-model="vote.isOpenSignup">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="报名时间：" :rules="[
      { required: true, message: '请选择报名时间', trigger: 'blur' }]" v-show="vote.isOpenSignup == 1">
        <el-date-picker
        v-model="time"
        type="datetimerange"
        @change="dateChange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right">
      </el-date-picker>
      </el-form-item>
       <el-form-item label="投票时间：" :rules="[
      { required: true, message: '请选择投票时间', trigger: 'blur' }]">
        <el-date-picker
        v-model="time2"
        type="datetimerange"
        @change="dateChange2"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right">
      </el-date-picker>
      </el-form-item>
      <el-form-item label="每日投票次数：" :rules="[
      { required: true, message: '请输入每日投票次数', trigger: 'blur' }]" prop="everydayVoteNum">
        <el-input v-model.number="vote.everydayVoteNum"></el-input>
      </el-form-item>
      <el-form-item label="是否重复投票：" :rules="[
      { required: true, message: '请选择是否重复投票', trigger: 'blur' }]" prop="isRepeatVote">
        <el-radio-group v-model="vote.isRepeatVote">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否首页展示：" :rules="[
      { required: true, message: '请选择是否首页展示', trigger: 'blur' }]" prop="isShow">
        <el-radio-group v-model="vote.isShow">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
       <el-form-item label="分享图片（未上传默认为封面图片）：">
        <single-upload v-model="vote.shareImg"></single-upload>
      </el-form-item>
      <el-form-item label="主办方：">
        <el-input v-model="vote.sponsor"></el-input>
      </el-form-item>
      <el-form-item label="主办方电话：">
        <el-input v-model="vote.sponsorPhone"></el-input>
      </el-form-item>
      <el-form-item label="浏览量：">
        <el-input v-model.number="vote.browse"></el-input>
      </el-form-item>
      <el-form-item label="活动介绍：" :rules="[
      { required: true, message: '请输入活动介绍', trigger: 'blur' }]" prop="voteIntroduce">
        <tinymce :width="695" :height="600" v-model="vote.voteIntroduce"></tinymce>
      </el-form-item>
      
      <el-form-item style="text-align:center">
        <el-button type="primary" @click="onSubmit('voteFrom',10)">保存</el-button>
        <el-button type="primary" @click="onSubmit('voteFrom',20)">发布</el-button>
        <el-button type="info" v-if="!isEdit" @click="resetForm('voteFrom')">重置</el-button>
        <el-button  @click="back()">返回</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createVote, getVote, updateVote} from '@/api/vote'
  import SingleUpload from '@/components/Upload/singleUpload'
  import Tinymce from '@/components/Tinymce'
  const defaultVote={
    voteTitle:'',
    voteBanner:'',
    beginTime:'',
    endTime:'',
    isOpenSignup:0,
    everydayVoteNum:null,
    isRepeatVote:1,
    shareImg:'',
    isShow:1,
    sponsor:'',
    sponsorPhone:'',
    browse:null,
    voteStatus:10
  };
  export default {
    name: 'VoteDetail',
    components:{SingleUpload,Tinymce},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        vote:Object.assign({}, defaultVote),
        time:[],
        time2:[],
        rules: {
         
        }
      }
    },
    created() {
      if (this.isEdit) {
        getVote(this.$route.query.id).then(response => {
          this.vote = response.data;
          this.time.push(this.vote.signupBeginTime)
          this.time.push(this.vote.signupEndTime)
          this.time2.push(this.vote.voteBeginTime)
          this.time2.push(this.vote.voteEndTime)
        });
      }else{
        this.vote = Object.assign({},defaultVote);
      }
    },
    methods: {
      dateChange(){
         if (this.time2.length > 0 && new Date(this.time2[0]) < new Date(this.time[0])) {
           this.$message({
              message: '报名时间不能在投票时间之后',
              type: 'error',
              duration:1000
            });
            this.time = [];
          return false;
        }
        this.vote.signBeginTime=this.time[0]
        this.vote.signEndTime=this.time[1]
      },
      dateChange2(){
        if (this.time.length > 0 && new Date(this.time2[0]) < new Date(this.time[0])) {
           this.$message({
              message: '投票时间不能在报名时间之前',
              type: 'error',
              duration:1000
            });
            this.time2 = [];
          return false;
        }
        this.vote.voteBeginTime=this.time2[0]
        this.vote.voteEndTime=this.time2[1]
      },
      onSubmit(formName,status) {
        if (this.vote.isOpenSignup == 1) {
          if (this.time.length <= 0) {
             this.$message({
              message: '请选择报名时间',
              type: 'error',
              duration:1000
            });
          return false;
          }
        }
        if (this.time2.length <= 0 || !this.time2[0] || !this.time2[1]) {
             this.$message({
              message: '请选择投票时间',
              type: 'error',
              duration:1000
            });
          return false;
        }
        let title = "是否提交数据";
        if (status === 20) {
          title = "确定发布"
        }
        this.vote.voteStatus = status;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm(title, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.isEdit) {
                updateVote(this.$route.query.id, this.vote).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createVote(this.vote).then(response => {
                  this.$refs[formName].resetFields();
                  this.vote = Object.assign({},defaultVote);
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              }
            });

          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration:1000
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.vote = Object.assign({},defaultVote);
      },
      back(){
        this.$router.back();
      }

    }
  }
</script>
<style>
</style>


