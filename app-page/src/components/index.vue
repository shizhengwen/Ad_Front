<template>
    <div class="hello">
        <header class="mui-bar mui-bar-nav header-mod">
            <img src="../../static/img/logo.png" />
        </header>
        <div class="container">
            <div class="recommend-container">
                <div class="contents">
                    <div class="imglist"><img src="../../static/img/navimg.png" /></div>
                    <div class="list-one">
                        <div class="list-one-box">
                            <div class="left">
                                <a :href="oneLi.url" v-text="oneLi.title"></a>
                                <p v-text="oneLi.source"></p>
                            </div>
                            <a class="right" :href="oneLi.url"><img :src="oneLi.head_img|imgurl(oneLi.head_img)" /></a>
                            <span class="line"></span>
                        </div>
                    </div>
                    <div class="list-two">
                        <h4>
                            <a href="#" v-text="twoLi.title"></a>
                        </h4>
                        <div class="content">
                            <a :href="twoLi.url"><img :src="twoLi.head_img|imgurl(twoLi.head_img)" alt="" /></a>
                        </div>
                        <p v-text="twoLi.source"></p>
                    </div>

                    <div class="list-three" v-for="(item,index) in listArrary" :key="index">
                        <h4>
                            <a :href="item.url" v-text="item.title"></a>
                        </h4>
                        <div class="list-items">
                            <div class="item">
                                <a :href="item.url"><img :src="item.head_img|imgurl(item.head_img)" /></a>
                            </div>
                            <div class="item">
                                <a :href="item.url"><img :src="item.head_img2|imgurl(item.head_img2)" /></a>
                            </div>
                            <div class="item">
                                <a :href="item.url"><img :src="item.head_img3|imgurl(item.head_img3)" /></a>
                            </div>
                        </div>
                        <p v-text="item.source"></p>
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
'use strict';
import axios from "axios";
import BScroll from "better-scroll";
import { Indicator } from "mint-ui";
export default {
    name: "home",
    data() {
        return {
            count: 10,
            oneLi: {},
            twoLi: {},
            listArrary: []
        };
    },
    filters: {
        imgurl(urls) {
            if (urls) {
                var newUrl = urls.substr(urls.indexOf("img/"));
                newUrl = "http://47.52.157.58:8080/static/article/" + newUrl;
                return newUrl;
            } else {
                return (urls = "../../static/img/toimg.png");
            }
        }
    },
    created() {
        this.getJoins();
    },
    methods: {
        getJoins() {
            axios
                .get("/information/all/").then(res => {
                    if( res.status == 200 ){
                        var allList = res.data.date;
                        setTimeout(()=>{
                            Indicator.close();
                        },1000)
                        if (allList.length > 0) {
                            this.oneLi = allList[0];
                        }
                        if (allList.length > 1) {
                            this.twoLi = allList[1];
                        }
                        if (allList.length > 3) {
                            this.listArrary = allList.splice(2);
                        }
                    }
                })
                .catch(error => {
                    console.log("数据请求失败" + error);
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
                    Indicator.open("正在刷新...");
                    this.oneLi = {};
                    this.twoLi = {};
                    this.listArrary = [];
                    this.getJoins();
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
    },
    mounted() {
        Indicator.open("加载中...");
        this._initBScroll();
    }
};
</script>

<style lang="scss">
@import "../../static/css/page.scss";
</style>

