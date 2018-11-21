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
                            <a class="right" :href="oneLi.url"><img :src="oneLi.head_img" /></a>
                            <span class="line"></span>
                        </div>
                    </div>
                    <div class="list-two">
                        <h4>
                            <a :href="twoLi.url" v-text="twoLi.title"></a>
                        </h4>
                        <div class="content">
                            <a :href="twoLi.url"><img :src="twoLi.head_img" alt="" /></a>
                        </div>
                        <p v-text="twoLi.source"></p>
                    </div>

                    <div class="list-three" v-for="(item,index) in listArrary" :key="index">
                        <h4>
                            <a :href="item.url" v-text="item.title"></a>
                        </h4>
                        <div class="list-items">
                            <div class="item">
                                <a :href="item.url"><img :src="item.head_img" /></a>
                            </div>
                            <div class="item">
                                <a :href="item.url"><img :src="item.head_img2" /></a>
                            </div>
                            <div class="item">
                                <a :href="item.url"><img :src="item.head_img3" /></a>
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
"use strict";
import axios from "axios";
import BScroll from "better-scroll";
import { Indicator } from "mint-ui";
import { Toast } from "mint-ui";
export default {
    name: "home",
    data() {
        return {
            count: 10,
            oneLi: {},
            twoLi: {},
            listArrary: [],
            page: 1,
        };
    },
    created() {
        this.getJoins();
    },
    methods: {
        getJoins() {
            var _vm = this;
            axios
                .get("/information/all/", {
                    params: { page: _vm.page, count: _vm.count }
                })
                .then(function(res) {
                    if (res.status == 200) {
                        var allList = res.data.date;
                        setTimeout(function() {
                            Indicator.close();
                        }, 1000);
                        if (allList.length > 0) {
                            _vm.oneLi = allList[0];
                        }
                        if (allList.length > 1) {
                            _vm.twoLi = allList[1];
                        }
                        if (allList.length > 2) {
                            _vm.listArrary = allList.splice(2);
                        }
                    }
                })
                .catch(function(error) {
                    console.log("数据请求失败" + error);
                });
        },
        _initBScroll() {
            var _vm = this;
            //1.1初始化
            this.listScroll = new BScroll(".recommend-container", {
                scrollY: true,
                probeType: 3,
                click: true
            });
            //1.2监听列表滚动
            this.listScroll.on("touchEnd", function(post) {
                //1.2.1监听下拉
                if (post.y > 50) {
                    Indicator.open("正在刷新...");
                    _vm.page = 1;
                    _vm.oneLi = {};
                    _vm.twoLi = {};
                    _vm.listArrary = [];
                    _vm.getJoins();
                }
                //1.2.2监听上拉
                if (_vm.listScroll.maxScrollY > post.y + 20) {
                    //console.log("上拉加载");
                    Indicator.open("加载中...");
                    _vm.page++;
                    axios
                        .get("/information/all/", {
                            params: { page: _vm.page, count: _vm.count }
                        })
                        .then(function(res) {
                            if (res.status == 200) {
                                //console.log(1111);
                                var addlis = res.data.date;
                                if (addlis && addlis.length > 0) {
                                    console.log(_vm.listArrary);
                                    for (var i = 0; i < addlis.length; i++) {
                                        _vm.listArrary.push(addlis[i]);
                                    }
                                    setTimeout(function() {
                                        Indicator.close();
                                    }, 500);
                                } else {
                                    Indicator.close();
                                    Toast({
                                        message: "没有更多数据",
                                        position: "bottom",
                                        duration: 3000
                                    });
                                }
                            }
                        });
                    // .catch(function(error) {
                    //     console.log("数据请求失败" + error);
                    // });
                }
            });
            //1.3列表结束滚动
            this.listScroll.on("scrollEnd", function() {
                _vm.listScroll.refresh();
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

