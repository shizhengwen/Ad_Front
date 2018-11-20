<template>
    <div class="hello">
        <header class="mui-bar mui-bar-nav header-mod">
            <img src="../../static/img/下载.png" />
        </header>
        <div class="container">
            <div class="recommend-container">
                <div class="contents">
                    <div class="imglist"><img src="../../static/img/navimg.png" /></div>
                    <div class="list-one">
                        <div class="list-one-box">
                            <div class="left">
                                <a href="#">男子借出租房为名持刀威胁杭州女房东，做出这种事儿</a>
                                <p>趣头条</p>
                            </div>
                            <a class="right" href="#"><img src="../../static/img/img2.png" /></a>
                            <span class="line"></span>
                        </div>
                    </div>
                    <div class="list-one">
                        <div class="list-one-box">
                            <div class="left">
                                <a href="#">男子借出租房为名持刀威胁杭州女房东，做出这种事儿</a>
                                <p>趣头条</p>
                            </div>
                            <a class="right" href="#"><img src="../../static/img/img2.png" /></a>
                            <span class="line"></span>
                        </div>
                    </div>
                    <div class="list-one">
                        <div class="list-one-box">
                            <div class="left">
                                <a href="#">男子借出租房为名持刀威胁杭州女房东，做出这种事儿</a>
                                <p>趣头条</p>
                            </div>
                            <a class="right" href="#"><img src="../../static/img/img2.png" /></a>
                            <span class="line"></span>
                        </div>
                    </div>
                    <div class="list-two">
                        <h4>快手短视频</h4>
                        <div class="content">
                            <a href="#"><img src="../../static/img/img1.png" alt="" /></a>
                        </div>
                        <p>(广告)快手</p>
                    </div>
                    <div class="list-three">
                        <h4>
                            <a href="#">猛犬界中的南丐北帝</a>
                        </h4>
                        <div class="list-items">
                            <div class="item">
                                <a href="#"><img src="../../static/img/img2.png" /></a>
                            </div>
                            <div class="item">
                                <a href="#"><img src="../../static/img/img2.png" /></a>
                            </div>
                            <div class="item">
                                <a href="#"><img src="../../static/img/img2.png" /></a>
                            </div>
                        </div>
                    </div>
                    <div class="list-three">
                        <h4>
                            <a href="#">猛犬界中的南丐北帝</a>
                        </h4>
                        <div class="list-items">
                            <div class="item">
                                <a href="#"><img src="../../static/img/img2.png" /></a>
                            </div>
                            <div class="item">
                                <a href="#"><img src="../../static/img/img2.png" /></a>
                            </div>
                            <div class="item">
                                <a href="#"><img src="../../static/img/img2.png" /></a>
                            </div>
                        </div>
                        <p>点点趣闻</p>
                    </div>
                    <div class="list-three">
                        <h4>
                            <a href="#">猛犬界中的南丐北帝</a>
                        </h4>
                        <div class="list-items">
                            <div class="item">
                                <a href="#"><img src="../../static/img/img2.png" /></a>
                            </div>
                            <div class="item">
                                <a href="#"><img src="../../static/img/img2.png" /></a>
                            </div>
                            <div class="item">
                                <a href="#"><img src="../../static/img/img2.png" /></a>
                            </div>
                        </div>
                        <p>点点趣闻</p>
                    </div>
                </div>
            </div>
        </div>
        <nav class="nav-mod">
            <a class="mui-tab-item mui-active">
                <span class="iconfont">&#xe611;</span>
                <span class="text">首页</span>
            </a>
            <a class="mui-tab-item">
                <span class="iconfont">&#xe641;</span>
                <span class="text">导航</span>
            </a>
            <a class="mui-tab-item">
                <span class="iconfont">&#xe669;</span>
                <span class="text">逛逛领币</span>
            </a>
            <a class="mui-tab-item">
                <span class="iconfont">&#xe61d;</span>
                <span class="text">任务</span>
            </a>
            <a class="mui-tab-item">
                <span class="iconfont">&#xe75c;</span>
                <span class="text">我的</span>
            </a>
        </nav>
    </div>
</template>

<script>
import axios from "axios";
import BScroll from "better-scroll";
import { Indicator } from 'mint-ui';
export default {
    name: "HelloWorld",
    data() {
        return {
            count: 10
        };
    },
    mounted() {
        this._initBScroll()
        this.getJoins()
    },
    methods: {
        getJoins() {
            axios.get("/information/all/").then(res => {
                console.log(res);
            });
        },
        _initBScroll() {
            //1.1初始化
            this.listScroll = new BScroll(".recommend-container", {
                scrollY: true,
                probeType: 3,
                click: true
            });
            //1.2监听列表滚动
            this.listScroll.on("touchEnd", post => {
                //1.2.1监听下拉
                if (post.y > 50) {
                    console.log("下拉刷新");
                }
                //1.2.2监听上拉
                if (this.listScroll.maxScrollY > post.y + 20) {
                    console.log("上拉加载");
                }
            });
            //1.3列表结束滚动
            this.listScroll.on("scrollEnd", () => {
                this.listScroll.refresh();
            });
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../../static/css/page.scss';
</style>

