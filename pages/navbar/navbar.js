var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
import imageAPI from '../../utils/data.js';
Page({
    data: {
        tabs: ["美图", "影评", "文章"],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0,
        activePic: 'http://api.shigeten.net/'+imageAPI.imageList[0].image,
        activeTitle: imageAPI.imageList[0].title,
        activeSummary: imageAPI.imageList[0].summary,
    activePicIndex: 0,
    imgs: [],
    titles:[],
    summarys:[]
    },
    onReady: function () {
       this.data.imgs = [];
        for(var i=0;i<9;i++){
            this.data.imgs.push({"url":"http://api.shigeten.net/"+imageAPI.imageList[i].image});
            this.data.titles.push({"title":imageAPI.imageList[i].title});
            this.data.summarys.push({"summary":imageAPI.imageList[i].summary});
        }
    this.setData({
      length: this.data.imgs.length,
      imgs: this.data.imgs,
      titles: this.data.titles,
      summarys: this.data.summarys,
      activePic: this.data.activePic,
      activeTitle: this.data.activeTitle,
      activePicIndex: this.data.activePicIndex,
      activeSummary: this.data.activeSummary,
    });
    },
    onLoad: function () {
        var that = this;
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                    sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
                });
            }
        }); 
    },
  pre: function () {
    // 上一页
    var vm = this;
    if (vm.data.activePicIndex > 0) {
      vm.animateOut();
      setTimeout(function () {
        vm.setData({
          activePic: vm.data.imgs[vm.data.activePicIndex - 1].url,
          activeTitle: vm.data.titles[vm.data.activePicIndex-1].title,
          activeSummary: vm.data.summarys[vm.data.activePicIndex-1].summary,
          activePicIndex: vm.data.activePicIndex - 1
        });
        vm.animateIn();
      }, 500);
    }
  },
  next: function () {
    // 下一页
    var vm = this;
    if (vm.data.activePicIndex < vm.data.imgs.length - 1) {
      vm.animateOut();
      setTimeout(function () {
        vm.setData({
          activePic: vm.data.imgs[vm.data.activePicIndex + 1].url,
          activeTitle: vm.data.titles[vm.data.activePicIndex+1].title,
          activeSummary: vm.data.summarys[vm.data.activePicIndex+1].summary,
          activePicIndex: vm.data.activePicIndex + 1
        });
        vm.animateIn();
      }, 500);
    }
  },
  animateIn: function () {
    // 图片显示动画
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    this.animation = animation
    animation.scale(0, 0).rotate(360).step()
    this.setData({
      animationData: animation.export()
    })

    setTimeout(function () {
      animation.scale(1, 1).rotate(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 500)
  },
  animateOut: function () {
    // 图片隐藏动画
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })

    this.animation = animation
    animation.scale(0, 0).rotate(360).step()
    this.setData({
      animationData: animation.export()
    });
  },
    tabClick: function (e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
    }
});