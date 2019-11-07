<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
        <div>
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
          
        </div>
        <div style="margin-top: 15px">
          <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
            <el-form-item label="输入搜索：">
              <el-input style="width: 203px" v-model="listQuery.keyword" placeholder="活动主题/关键字"></el-input>
            </el-form-item>
            <el-form-item label="状态：">
              <el-select v-model="listQuery.voteStatus" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-button
            style="margin-left:20px"
            @click="searchVoteList()"
            type="primary"
            size="small">
            查询结果
          </el-button>
          </el-form>
        </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        type="success"
        @click="addVote()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="voteTable"
                :data="list"
                style="width: 100%"
                v-loading="listLoading"
                border>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="主题" align="center">
          <template slot-scope="scope">{{scope.row.voteTitle}}</template>
        </el-table-column>
        <el-table-column label="是否开放报名"  align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.isOpenSignup == 0">否</span>
            <span v-if="scope.row.isOpenSignup == 1">是</span>
          </template>
        </el-table-column>
        <el-table-column label="报名开始时间" align="center">
          <template slot-scope="scope">{{scope.row.signupBeginTime}}</template>
        </el-table-column>
        <el-table-column label="报名结束时间"  align="center">
          <template slot-scope="scope">{{scope.row.signupEndTime}}</template>
        </el-table-column>
         <el-table-column label="投票开始时间" width="150" align="center">
          <template slot-scope="scope">{{scope.row.voteBeginTime}}</template>
        </el-table-column>
        <el-table-column label="投票结束时间" width="150" align="center">
          <template slot-scope="scope">{{scope.row.voteEndTime}}</template>
        </el-table-column>
        <el-table-column label="每日投票次数" width="100" align="center">
          <template slot-scope="scope">{{scope.row.everydayVoteNum}}</template>
        </el-table-column>
        <el-table-column label="是否重复投票"  align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.isRepeatVote == 0">否</span>
            <span v-if="scope.row.isRepeatVote == 1">是</span>
          </template>
        </el-table-column>
        <el-table-column label="状态"  align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.voteStatus == 10">已保存</span>
            <span v-if="scope.row.voteStatus == 20">已生效</span>
            <span v-if="scope.row.voteStatus == 30">已失效</span>
          </template>
        </el-table-column>
       
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini" type="primary" icon="el-icon-edit" circle
              @click="handleUpdate(scope.$index, scope.row)">
            </el-button>
            <el-button
              size="mini"
              type="danger" icon="el-icon-delete" circle
              @click="handleDelete(scope.$index, scope.row)">
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :current-page.sync="listQuery.pageNum"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import {fetchList, deleteVote} from '@/api/vote'
  export default {
    name: 'voteList',
    data() {
      return {
        listQuery: {
          keyword: null,
          voteStatus:null,
          pageNum: 1,
          pageSize: 10
        },
        list: null,
        total: null,
        listLoading: true,
        options: [{
          value:'',
          label:'全部'
        },{
          value: 10,
          label: '已保存'
        }, {
          value: 20,
          label: '已生效'
        }, {
          value: 30,
          label: '已失效'
        }],
      }
    },
    created() {
      this.getList();
    },
    methods: {
      getList() {
        this.listLoading = true;
        fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.rows;
          this.total = response.total;
          this.totalPage = response.pageInfo.totalPage;
          this.pageSize = response.pageInfo.pageSize;
        });
      },
      
      handleUpdate(index, row) {
        this.$router.push({path: '/pms/updateVote', query: {id: row.id}})
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该活动', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteVote(row.id).then(response => {
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: 1000
            });
            this.getList();
          });
        });
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      searchVoteList() {
        this.listQuery.pageNum = 1;
        this.getList();
      },
      addVote() {
        this.$router.push({path: '/pms/addVote'})
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>


</style>


