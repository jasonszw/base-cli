<template>
	<div class="home" v-show="homeShow">
		<div class="content-top">
			<img src="./../assets/img/bg.png" class="bg" alt="">
			<div class="content-info">
				<div class="logo-wrap">
					<img src="./../assets/img/logo.png" class="logo" alt="">
					<img src="./../assets/img/right-logo.png" class="right-logo" alt="">
				</div>
				<img src="./../assets/img/title.png" class="title-img" alt="">
				<div class="title-info">
					<span class="circular"></span>
					<p>购买<span>6</span>件“太医管家”瓜分<span>10</span>万元</p>
					<span class="circular"></span>
				</div>
				<div class="bg-shadow">
					<van-notice-bar scrollable :text="text"/>
				</div>
				<div class="zhuan-pan">
					<img src="./../assets/img/zhuan-pan-bg.png" class="zhuan-pan-bg" alt="">
					<div class="zhuan-pan-wrap">
						<div class="box">
							<div class="lottery" :style="lotteryStyle">
								<div class="block" v-for="item in turnplateList" :key="item.id">
									<div class="content">
										<svg height="40" width="90">
											<defs>
												<path id="path1" d="m13,30 q0,-20 200,20"/>
											</defs>
											<text x="" y="" style="fill:red;font-size:10;font-weight: bolder">
												<textPath xlink:href="#path1">现金红包{{ item.amount }}元</textPath>
											</text>
										</svg>
										<div class="red-packet-content-bi" v-if="item.amount == minAmount"></div>
										<div class="red-packet-content" v-else><p>{{ item.amount }}<span>元</span></p>
										</div>
									</div>
								</div>
							</div>
							<div class="lottery-btn" @click="lotteryBtn"></div>
						</div>
						<div class="lottery-nums">您现有<span>{{ chance }}</span>次抽奖机会</div>
					</div>
				</div>
				<p class="join-person">已有<span>{{ total }}</span>人中奖</p>
				<img src="./../assets/img/name-list.png" @click="nameListBtn" class="name-list" alt="">
				<img src="./../assets/img/history.png" @click="historyBtn" class="history-img" alt="">
			</div>
		</div>
		<div class="content-bottom">
			<div class="tui-jian-content">
				<img src="./../assets/img/tui-jian-bg.png" class="tui-jian-bg" alt="">
				<div class="tui-jian-wrap">
					<img src="./../assets/img/gua-fen.png" class="gua-fen-img" alt="">
					<div class="progress-content">
						<p>当前进度<span>{{ nowSchedule }}</span>/6</p>
						<div class="progress-bar">
							<div class="progress-item" :style="progressStyle">
								<div class="cricle" v-if="cricleShow"></div>
							</div>
							<img :class="{moveImg: !cricleShow}" src="./../assets/img/man-packet.png" alt="">
						</div>
					</div>
					<p v-if="!cricleShow">恭喜你获得瓜分资格</p>
					<div v-if="guaFenShow" class="gua-fen-amount"><span>{{ info.user_activate_total }}人</span>已购买6件，每人瓜分
						<span>{{ info.user_avg_amount }}元</span></div>
				</div>
			</div>
			<div class="active-rule-content">
				<img src="./../assets/img/active-rule-title.png" alt="">
				<p><span>（1）</span><span>成功购买且在犹豫期内（7天）未退单的订单</span></p>
				<p><span>（2）</span><span>5月31日前每销售1件太医管家，可获得2次抽奖机会，以此类推</span></p>
				<p><span>（3）</span><span>6月1日-8月31日期间每销售1件太医管家，可获得1次抽奖机会，以此类推</span></p>
			</div>
		</div>
		<van-popup v-model="show">
			<div class="content-winning" v-if="winningShow">
				<img src="./../assets/img/lottert-bg.png" class="lottery-bg" alt="">
				<img src="./../assets/img/delete.png" @click="closeShow" class="delete" alt="">
				<div class="info-winning">
					<img src="./../assets/img/chou-zhong.png" class="chou-zhong" alt="">
					<p class="amount-winning">{{ amount }}<span>元</span></p>
					<img src="./../assets/img/shou-xia.png" @click="closeShow" class="shou-xia" alt="">
					<p class="history-winning-toast">红包可在「中奖记录」中查看</p>
				</div>
			</div>
			<div class="winning-history" v-if="historyShow">
				<img src="./../assets/img/lottery-history.png" class="lottery-history" alt="">
				<img src="./../assets/img/delete.png" @click="closeShow" class="delete" alt="">
				<div class="info-history">
					<ul>
						<li><span>日期</span><span>金额</span></li>
						<li v-for="(item,index) in historyUserList" :key="index">
							<span>{{ item.date }}</span><span>{{ item.amount }}元</span></li>
					</ul>
					<p>红包在太医管家销售通小程序中查看</p>
				</div>
			</div>
		</van-popup>

		<div class="winning-name-shadow" @click="nameShadow($event)" v-if="winningName">
			<div class="winning-name" ref="winningShadow">
				<div id="poster" style="overflow-x: hidden">
					<img src="./../assets/img/winning-bg.png" class="winning-bg" alt="">
					<div class="winning-name-wrap">
						<div class="winning-info">
							<div class="winning-nums">本周中奖人数：<span>{{ total }}</span></div>
							<div class="name-888">
								<img src="./../assets/img/888.png" alt="">
								<ul>
									<li ref="name888" v-for="(item,index) in name888" :key="index">{{ item }}</li>
								</ul>
							</div>
							<div class="name-88">
								<img src="./../assets/img/88.png" alt="">
								<ul>
									<li ref="name88" v-for="(item,index) in name88" :key="index">{{ item }}</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<img :src="posterUrl" class="poster-url" alt="">
				<p class="save-poster">长按保存图片</p>
				<img src="./../assets/img/delete.png" @click="closeShow" class="delete" alt="">
			</div>
		</div>
	</div>
</template>

<script>
import {reg_userinfo, do_login, user_prize_info, prize_winning_info, lottery} from "../utils/apiList";
import {Toast, Dialog} from "vant";
import html2canvas from "html2canvas";

export default {
	name: "Home",
	data() {
		return {
			cricleShow: true,
			guaFenShow: false,
			homeShow: false,
			winningShow: false,
			historyShow: false,
			winningName: false,
			show: false,
			nowSchedule: 0,
			progressStyle: {
				width: 0
			},
			lotteryStyle: {
				transition: "",
				transform: ""
			},
			turnplateList: [],
			minAmount: 0,
			info: {},
			historyUserList: [],
			name88: ["虚位以待", "虚位以待", "虚位以待", "虚位以待", "虚位以待", "虚位以待", "虚位以待", "虚位以待", "虚位以待", "虚位以待"],
			name888: ["虚位以待", "虚位以待", "虚位以待", "虚位以待", "虚位以待", "虚位以待", "虚位以待", "虚位以待", "虚位以待", "虚位以待"],
			chance: 0,
			amount: 0,
			total: 0,
			posterUrl: "",
			text: '',
			lottery: true
		}
	},
	watch: {
		show(val, oldVal) {
			if (!val) {
				this.winningShow = false;
				this.historyShow = false;
				this.winningName = false
			}
		},
		winningShow(val, oldVal) {
			if (!val) {
				this.$set(this.lotteryStyle, 'transition', "all 0s ease")
				this.$set(this.lotteryStyle, 'transform', "rotate(45deg)")
			}
		}
	},
	created() {
	},
	mounted() {
		let openid = getQueryVariable("openid");
		let empNo = getQueryVariable("empNo");
		let empName = getQueryVariable("empName");
		if (!empName) {
			empName = ""
		}
		localStorage.setItem('openId', openid);
		localStorage.setItem('empNo', empNo);
		localStorage.setItem('empName', empName);
		// 注册用户信息接口
		this.registerUserInfo(openid, empNo, empName);
	},
	methods: {
		// 点击抽奖按钮
		lotteryBtn() {
			if (this.chance == 0) {
				Toast("次数不足 成功推荐1件“太医管家”获得1次抽奖机会")
				return false
			}
			if (this.lottery) {
				this.lottery = false;
				lottery().then(res => {
					if (res.status === 0) {
						let lotteryId = 0;
						this.chance = res.data.chance;
						if (res.data.amount == 1.8) {
							lotteryId = 3;
						}
						if (res.data.amount == 88) {
							lotteryId = 2;
						}
						if (res.data.amount == 888) {
							lotteryId = 1;
						}
						this.amount = res.data.amount;
						let deg = 720 + 45 * (lotteryId) + 20;
						this.$set(this.lotteryStyle, 'transition', "all 5s ease");
						this.$set(this.lotteryStyle, 'transform', "rotate(" + deg + "deg)");
						setTimeout(() => {
							this.show = true;
							this.winningShow = true;
							this.lottery = true
						}, 5000)
					} else {
						Toast(res.msg)
						this.lottery = true
					}
				})
			}

		},
		closeShow() {
			this.show = false;
			this.winningName = false;
			document.body.classList.remove("van-overflow-hidden");
		},
		nameShadow(e) {
			let nameShadow = this.$refs.winningShadow;
			if (nameShadow && !nameShadow.contains(e.target)) {
				this.show = false;
				this.winningName = false;
				document.body.classList.remove("van-overflow-hidden");
			}
		},
		// 中奖名单按钮
		nameListBtn() {
			this.winningName = true;
			document.body.setAttribute("class", "van-overflow-hidden");
			this.$nextTick(() => {
				for (let i in this.name88) {
					if (this.name88[i] !== "虚位以待") {
						this.$refs.name88[i].style.color = "#000000"
					}
				}
				for (let i in this.name888) {
					if (this.name888[i] !== "虚位以待") {
						this.$refs.name888[i].style.color = "#000000"
					}
				}

				if (!this.posterUrl) {
					Toast.loading({
						message: '海报生成中...',
						duration: 0,
						forbidClick: true
					});
					let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
					let that = this;
					// 生成海浩 截图
					setTimeout(() => {
						let boxH = document.getElementsByClassName('winning-name-shadow')[0].offsetHeight;
						let wrapH = document.getElementsByClassName('winning-name')[0].offsetHeight;
						let diffH = boxH - wrapH;
						html2canvas(document.getElementById('poster'), {
							useCORS: true,
							y: scrollTop + diffH / 2
						}).then(function (canvas) {
							that.posterUrl = canvas.toDataURL();
							Toast.clear();
						}).catch(err => {
							console.log(err)
						});
					}, 2000)
				}
			})
		},
		// 中间记录按钮
		historyBtn() {
			this.show = true;
			this.historyShow = true;
			user_prize_info().then(res => {
				if (res.status === 0) {
					this.historyUserList = res.data
				} else {
					Toast(res.msg)
				}
			})
		},
		// 注册用户信息
		registerUserInfo(openid, empNo, empName) {
			Toast.loading({
				message: "加载中...",
				forbidClick: true,
				duration: 100
			});
			reg_userinfo(openid, empNo, empName).then(res => {
				Toast.clear();
				if (res.status !== 0) {
					Dialog.alert({
						title: "提示",
						message: res.msg
					});
				} else {
					this.doLogin();
					this.getPrizeInfo();
				}
			})
		},
		// 微信登录
		doLogin() {
			do_login().then(res => {
				console.log(res, '=======do_login=======');
				if (res.status === 0) {
					let data = res.data;
					sessionStorage.setItem("token", data.token);
					sessionStorage.setItem("nickname", data.nickname);
					sessionStorage.setItem("chance", data.chance);
					sessionStorage.setItem("over", data.over);
					sessionStorage.setItem("activate_count", data.activate_count);
					this.homeShow = true;
					this.info = data;
					this.chance = data.chance;
					this.nowSchedule = Number(data.activate_count);
					this.minAmount = Math.min.apply(null, data.prize_amount);
					if (Number(data.user_activate_total) > 0) {
						this.guaFenShow = true
					}
					let _turnplateList = [];
					for (let i = 0; i < 8; i++) {
						_turnplateList.push({
							id: i + 1,
							amount: data.prize_amount[i] ? data.prize_amount[i] : i - 3 >= 3 ? data.prize_amount[i - 6] : data.prize_amount[i - 3]
						});
					}
					this.turnplateList = _turnplateList.reverse();

					if (this.nowSchedule === 0) {
						this.progressStyle.width = 20 + 'px';
					} else {
						if (this.nowSchedule < 6) {
							this.progressStyle.width = this.nowSchedule / 6 * 100 + "%";
						} else {
							this.cricleShow = false;
							this.progressStyle.width = 100 + "%";
						}
					}

				} else {
					Dialog.alert({
						title: "提示",
						message: res.msg
					});
				}
			});
		},
		// 中奖名单
		getPrizeInfo() {
			prize_winning_info().then(res => {
				if (res.status === 0) {
					this.total = res.total;
					let _text = "";
					if (res.data.length > 0) {
						let _testData = res.data;
						let _88 = [];
						let _888 = [];
						for (let i in _testData) {
							if (_testData[i].amount == 88) {
								_88.push(_testData[i])
							}
							if (_testData[i].amount === 888) {
								_888.push(_testData[i])
							}
							_text += _testData[i].nickname + '手气爆棚，抽到' + _testData[i].amount + '元红包 ';
						}
						this.text = _text;
						for (let i in _88) {
							this.name88[i] = _88[i].nickname
						}
						for (let i in _888) {
							this.name888[i] = _888[i].nickname
						}
					}
				} else {
					Toast(res.msg)
				}
			})
		}
	},
	components: {}
}
</script>

<style scoped lang="scss">
.home {
	width: 100%;
	overflow-x: hidden;

	.content-top {
		position: relative;
		font-size: 0;

		.bg {
			width: 100%;
		}

		.content-info {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
		}

		.logo-wrap {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.logo {
				width: 100px;
				padding-top: 10px;
			}

			.right-logo {
				width: 50%;
				padding-top: 10px;
				padding-right: 15px;
			}
		}

		.title-img {
			width: 90%;
			margin-left: 5%;
			margin-top: 10px;
		}

		.title-info {
			width: 80%;
			margin: 0 auto;
			display: flex;
			align-items: center;
			justify-content: space-around;
			height: 30px;
			background: #ff3200;
			border-radius: 15px;
			font-size: 16px;
			color: white;
			font-weight: bolder;

			.circular {
				width: 5px;
				height: 5px;
				border-radius: 50%;
				background: white;
			}

			p {
				span {
					color: #ffe166;
					font-weight: bolder;
					padding: 0 2px;
					font-size: 20px;
				}
			}
		}

		.bg-shadow {
			width: 260px;
			height: 35px;
			background: url("./../assets/img/bg-sharow.png") no-repeat;
			background-size: 100% 100%;
			margin: 10px auto 0;
			text-align: center;
			font-size: 16px;
			font-weight: bolder;
			line-height: 35px;

			.van-notice-bar {
				color: white;
				background: transparent;
			}
		}

		.zhuan-pan {
			width: 78%;
			margin: 5px auto 0;
			position: relative;

			.zhuan-pan-bg {
				width: 100%;
			}

			.zhuan-pan-wrap {
				width: 85%;
				height: 100%;
				position: absolute;
				left: 50%;
				top: 0;
				z-index: 1;
				transform: translateX(-50%);
				display: flex;
				flex-direction: column;
				align-items: center;
			}

			.box {
				width: 230px;
				height: 230px;
				border-radius: 50%;
				position: relative;
				overflow: hidden;
				margin-top: 22px;
				margin-left: 3px;
			}

			.lottery {
				width: 230px;
				height: 230px;
				margin: 0 auto;
				border-radius: 50%;
				overflow: hidden;
				position: relative;
				transform: rotate(45deg);
			}

			.block {
				position: absolute;
				width: 115px;
				height: 115px;
				font-size: 0;
				box-shadow: 0 0 0 2px #c12b20 inset;
				transform-origin: right bottom 0;
				-webkit-transform-origin: right bottom 0;
				background: #f3e2cd;
			}

			.block:nth-child(1) {
				transform: rotate(0deg) skewY(45deg);
			}

			.block:nth-child(2) {
				transform: rotate(45deg) skewY(45deg);
			}

			.block:nth-child(3) {
				transform: rotate(90deg) skewY(45deg);
			}

			.block:nth-child(4) {
				transform: rotate(135deg) skewY(45deg);
			}

			.block:nth-child(5) {
				transform: rotate(180deg) skewY(45deg);
			}

			.block:nth-child(6) {
				transform: rotate(225deg) skewY(45deg);
			}

			.block:nth-child(7) {
				transform: rotate(270deg) skewY(45deg);
			}

			.block:nth-child(8) {
				transform: rotate(315deg) skewY(45deg);
			}

			.content {
				width: 100px;
				height: 120px;
				transform-origin: center center 0;
				transform: skewY(-45deg) rotate(-22.5deg) translate(10px, 70px);
				-webkit-transform: skewY(-45deg) rotate(-22.5deg) translate(10px, 70px);
				position: absolute;
				right: 10px;
				bottom: 0;
				text-align: center;

				.red-packet-content {
					width: 30px;
					height: 40px;
					background: url("./../assets/img/redpacket.png") no-repeat;
					background-size: 100% 100%;
					position: absolute;
					top: 35px;
					left: 50%;
					transform: translateX(-50%);

					p {
						color: #e2c2a0;
						font-size: 10px;
						margin-top: 20px;
					}

					span {
						font-size: 5px;
					}
				}

				.red-packet-content-bi {
					width: 30px;
					height: 30px;
					background: url("./../assets/img/jin-bi.png") no-repeat;
					background-size: 100% 100%;
					position: absolute;
					top: 35px;
					left: 50%;
					transform: translateX(-50%);
				}
			}

			.lottery-btn {
				width: 75px;
				height: 90px;
				background: url("./../assets/img/go.png") no-repeat;
				background-size: 100% 100%;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-53%, -60%);
			}

			.lottery-nums {
				width: 80%;
				height: 40px;
				border-radius: 20px;
				text-align: center;
				background: #bb4316;
				position: absolute;
				bottom: 10px;
				font-size: 16px;
				color: white;
				font-weight: bolder;
				letter-spacing: 1px;
				line-height: 40px;

				span {
					color: #ffe17a;
					font-size: 20px;
				}
			}
		}

		.history-img, .name-list {
			position: absolute;
			right: 0;
			width: 80px;
			bottom: 60px;
			z-index: 20;
		}

		.name-list {
			bottom: 100px;
		}

		.join-person {
			color: white;
			font-size: 14px;
			position: absolute;
			bottom: 25px;
			left: 50%;
			transform: translateX(-50%);
			letter-spacing: 1px;

			span {
				font-weight: bolder;
				font-size: 18px;
			}
		}
	}

	.content-bottom {
		width: 100%;
		background: #f08847;

		.tui-jian-content {
			position: relative;
			text-align: center;

			.tui-jian-bg {
				width: 90%;
				pointer-events: none;
				margin: 20px auto 0;
			}

			.tui-jian-wrap {
				width: 90%;
				height: 73%;
				position: absolute;
				bottom: 0;
				left: 5%;
				display: flex;
				align-items: center;
				flex-direction: column;
				justify-content: center;

				.gua-fen-img {
					width: 50%;
					margin-top: -10px;
				}

				p {
					font-size: 13px;
					color: white;
					text-align: center;
					font-weight: bolder;
					margin-top: 10px;
				}
			}

			.progress-content {
				width: 90%;
				margin-top: 0;

				p {
					width: 90%;
					margin: 0 auto 10px;
					text-align: left;
					font-size: 14px;
					font-weight: bolder;
					color: white;
					letter-spacing: 2px;

					span {
						color: #ffe17a;
						font-size: 16px;
						padding-left: 4px;
					}
				}

				.progress-bar {
					width: 90%;
					height: 10px;
					margin: 0 auto;
					background: #ef935e;
					box-shadow: inset 0 0 5px 0 #fff;
					border-radius: 10px;
					position: relative;

					img {
						width: 50px;
						position: absolute;
						right: -10px;
						top: -30px;
						z-index: 2;
					}
				}

				.progress-item {
					width: 0;
					height: 10px;
					margin: 0 auto;
					background: #f5c38e;
					border-radius: 10px;
					position: absolute;
					z-index: 2;
					left: 0;
					top: 0;

					.cricle {
						width: 20px;
						height: 20px;
						background: #f4be87;
						position: absolute;
						right: 0;
						top: -5px;
						border-radius: 50%;
						z-index: 2;
					}
				}

				.moveImg {
					animation: move 3s infinite;
				}

				@keyframes move {
					0%, 65% {
						-webkit-transform: rotate(0deg);
						transform: rotate(0deg);
					}
					70% {
						-webkit-transform: rotate(6deg);
						transform: rotate(6deg);
					}
					75% {
						-webkit-transform: rotate(-6deg);
						transform: rotate(-6deg);
					}
					80% {
						-webkit-transform: rotate(6deg);
						transform: rotate(6deg);
					}
					85% {
						-webkit-transform: rotate(-6deg);
						transform: rotate(-6deg);
					}
					90% {
						-webkit-transform: rotate(6deg);
						transform: rotate(6deg);
					}
					95% {
						-webkit-transform: rotate(-6deg);
						transform: rotate(-6deg);
					}
					100% {
						-webkit-transform: rotate(0deg);
						transform: rotate(0deg);
					}
				}

			}

			.gua-fen-amount {
				background: #c33d17;
				width: 70%;
				height: 25px;
				border-radius: 10px;
				text-align: center;
				font-size: 12px;
				color: white;
				font-weight: bolder;
				line-height: 25px;
				margin-top: 5px;

				span {
					font-size: 13px;
					color: #ffe17a;
				}
			}
		}

		.active-rule-content {
			width: 90%;
			margin: 0 auto;
			display: flex;
			align-items: center;
			flex-direction: column;
			padding-bottom: 20px;

			img {
				width: 80%;
				margin: 20px 0;
			}

			p {
				width: 100%;
				color: white;
				font-size: 14px;
				display: flex;
				justify-content: flex-start;
				padding-bottom: 8px;
			}
		}
	}

	.van-popup {
		width: 100%;
		background: transparent;
	}

	.winning-name-shadow {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .7);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 20;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.content-winning {
		font-size: 0;
		margin-top: -40px;
		text-align: center;

		.lottery-bg {
			width: 100%;
		}

		.info-winning {
			width: 65%;
			height: 56%;
			position: absolute;
			left: 50%;
			transform: translateX(-51%);
			top: 30%;
			display: flex;
			flex-direction: column;
			align-items: center;

			.chou-zhong {
				width: 50%;
				padding-top: 30px;
			}

			.amount-winning {
				color: #ed3001;
				font-size: 24px;
				font-weight: bolder;
				letter-spacing: 2px;
				padding-top: 20px;

				span {
					font-size: 16px;
				}
			}

			.shou-xia {
				width: 65%;
				padding-top: 100px;
			}

			.history-winning-toast {
				color: white;
				font-size: 12px;
				padding-top: 15px;
			}
		}
	}

	.winning-history {
		font-size: 0;
		margin-top: -40px;
		text-align: center;

		.lottery-history {
			width: 100%;
		}

		.info-history {
			width: 65%;
			height: 40%;
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			top: 45%;
			display: flex;
			flex-direction: column;
			align-items: center;
			overflow: hidden;

			ul {
				width: 100%;
				height: 90%;
				overflow-y: scroll;

				li {
					width: 90%;
					display: flex;
					margin: 0 auto;
					align-items: center;
					justify-content: space-between;
					color: white;
					padding: 5px 0;

					span {
						font-size: 14px;
					}

					p {
						font-size: 18px;
						font-weight: bolder;
					}
				}
			}

			p {
				text-align: center;
				color: white;
				font-size: 12px;
				padding-top: 5px;
			}
		}
	}

	.winning-name {
		font-size: 0;
		text-align: center;
		position: relative;
		width: 70%;
		margin: 0 auto;

		#poster {
			position: relative;
			border-radius: 15px;
		}

		.winning-bg {
			width: 100%;
		}

		.poster-url {
			width: 100%;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 20;
			border-radius: 15px;
			opacity: 0;
		}

		.winning-name-wrap {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			border-radius: 15px;

			.winning-bottom {
				width: 100%;
				position: absolute;
				bottom: 0;
				left: 0;
			}

			.winning-info {
				width: 100%;
				position: absolute;
				top: 30%;
				left: 0;
				z-index: 2;
				display: flex;
				flex-direction: column;
				align-items: center;
			}

			.winning-nums {
				width: 80%;
				height: 30px;
				border-radius: 20px;
				background: linear-gradient(to bottom, #fdf0c0, #fdc742);
				color: #fc663b;
				font-size: 14px;
				line-height: 30px;
				margin-top: 20px;

				span {
					font-weight: bolder;
					font-size: 18px;
				}
			}

			.name-888, .name-88 {
				width: 90%;
				background: white;
				border-radius: 10px;
				margin-top: 10px;

				img {
					width: 90%;
					margin-top: 10px;
					margin-bottom: 10px;
				}

				ul {
					width: 90%;
					margin: 0 auto;
					display: flex;
					flex-wrap: wrap;

					li {
						width: 25%;
						overflow: hidden;
						font-size: 10px;
						font-weight: 600;
						margin-bottom: 10px;
						color: #8a8a8a
					}
				}
			}
		}

		.save-poster {
			margin-top: 20px;
			font-size: 14px;
			color: #ffe17a;
		}
	}

	.delete {
		display: block;
		width: 35px;
		margin: 20px auto 0;
	}
}

</style>
