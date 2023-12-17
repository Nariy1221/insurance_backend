<template>
    <el-col :span="span">
        <div class="title">{{ item.title }}（{{ item.unit }}）</div>
        <div class="statistic">
            <el-statistic group-separator="," :precision="item.unit == '元' ? 2 : 0" :value="item.statistic"
                style="display: flex;" class="statistic">
                <template slot="prefix">

                </template>
            </el-statistic>
        </div>
        <div class="info">

        <i :class="changeNum > 0 ? 'el-icon-top up' : 'el-icon-bottom down'"></i>
            <div class="text">
                <span>{{ changeNum }}%</span>
                <br />
                {{ item.info }}
            </div>
        </div>
    </el-col>
</template>
<script>
export default {
    name: 'statisticBlock',
    props: {
        data: {
            type: Object,
        },
        width: {
            type: Number,
            default: 6
        }
    },
    data() {
        return {
            item: {},
            span: 6,
        }
    },
    created() {

    },
    mounted() {
        this.item = this.data
        this.span = this.width
    },
    watch: {
        data(nval) {
            this.item = nval
        },
        span(nval) {
            this.span = nval
        }

    },
    computed: {
        changeNum() {
            return ((this.item.statistic - this.item.last) / this.item.last *100).toFixed(2)
            
        }
    },
    methods: {

    }
}
</script>
  
<style lang="scss" scoped>
.el-card {
    border-radius: 10px;
}

.el-statistic .con .number {
    font-size: 28px;
}

.clearfix>span {
    font-weight: 700;
    font-size: 18px;
}

.title {
    margin-bottom: 20px;
    margin-left: 5px;
    color: #787878;
}

.statistic {
    font-weight: 700;
    font-size: 28px;
}

.info {
    display: flex;
    align-items: center;
    margin-left: 5px;
    margin-top: 10px;
    color: #787878;
}

.info>i {
    padding: 10px;
    border-radius: 5px;
    font-weight: 700;
    color: #FAFAFA;
}

.info .up {
    background-color:#6071c0;//#EE7785
}

.info .down {
    background-color:#a1ca7f;//#67D5B5
}

.info .text {
    font-size: 10px;
    margin-left: 10px;
}

.text>span {
    font-size: 16px;
}
</style>                                                                              