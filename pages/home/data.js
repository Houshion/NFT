import config from "@/common/config";
// nav导航栏
export const NAV_BOTTOM_LIST = [
  {
    name: "SHOP",
    img: require("@/static/images/homeIcon/shop.png"),
    // url: "/pages/home/produce?type=shop",
    // type: "navigateTo",
    url: "http://shop.snt-art.com/index.aspx",
    type: "outUrl",
  },
  {
    name: "NFT",
    img: require("@/static/images/homeIcon/nft.png"),
    url: "/pages/nft/main/home",
    type: "switchTab",
  },
  {
    name: "GAMEFI",
    img: require("@/static/images/homeIcon/gamefi.png"),
    url: "/pages/home/produce?type=gamefi",
    type: "navigateTo",
  },
  {
    name: "METAVERSE",
    img: require("@/static/images/homeIcon/metaverse.png"),
    url: "/pages/home/produce?type=metaverse",
    type: "navigateTo",
  },
];

export const TEAM_CONTENT = `SNT团队由众多领域的顶尖人才搭建而成，在各自领域都有一定才华和经验，经历了时代的洗礼和生活的磨炼后逐渐升华，为了开创新的元宇宙世界和早日达到Web3.0时代，SNT众人集合成为了如今初具规模的团队，未来将会与更多的SNT家人一起创造彼此的绿洲，开创元宇宙世界`;

export const STORY_CONTENT = `<p>
<span style="font-size:14px;color:#000000;">SNT初代的绿洲世界是由</span><strong><span style="font-size:14px;color:#000000;">5大元素</span></strong><span style="font-size:14px;color:#000000;">板块组成的分别为:</span> 
</p >
<p>
<br />
</p >
<strong><span style="color:#000000;font-size:14px;">精灵森林(木)</span></strong><strong><span style="font-size:14px;color:#000000;">、</span><span style="color:#000000;font-size:14px;">万石圣山(土)</span><span style="font-size:14px;color:#000000;">、</span><span style="color:#000000;font-size:14px;">幻青之海(水)</span><span style="font-size:14px;color:#000000;">、</span><span style="color:#000000;font-size:14px;">灭焰荒漠(火)</span><span style="font-size:14px;color:#000000;">、</span><span style="color:#000000;font-size:14px;">天神之城(金)</span></strong><span style="color:#000000;font-size:14px;">&nbsp;</span><span style="font-size:14px;color:#000000;"> &nbsp; 五大领域世界。</span><br />
<br />
<span style="font-size:14px;color:#000000;">每个领域世界都有专属属性的内容构造和故事背景。</span><br />
<br />
<p>
<span style="font-size:14px;"><span style="color:#000000;">未来我们所有的用户可以在这五大元素世界进行奇幻</span><span style="color:#000000;">旅程</span><strong><span style="color:#000000;">，收集并积攒各地图元素的相关内容</span></strong><span style="color:#000000;">。</span></span> 
</p >
<p>
<span style="font-size:14px;"><br />
</span> 
</p >
<p>
<span style="font-size:14px;"><span style="color:#000000;">所有领域世界的内容可以转化多元化形态(</span><span style="color:#000000;">例如:某些元素生物转化为装备形态</span><span style="color:#000000;">)。</span></span> 
</p >
<p>
<span style="font-size:14px;color:#000000;"><strong>SNT绿洲世界的所有内容后期也会结合实物领域的相应权益。</strong></span> 
</p >
<span style="font-size:14px;"></span><br />
<span style="font-size:14px;color:#000000;">当然SNT也欢迎更多的创作者共同搭建与创造我们的绿洲世界</span><br />
<br />
<p>
<span style="font-size:14px;color:#000000;">SNT 绿洲世界的NFT会结合Gamefi领域形成多元化的游戏体验</span> 
</p >
<p>
<span style="font-size:14px;color:#000000;">(例如: 卡牌、自走棋、大型3D游戏PVE和PVP 等内容)，让所有的用户体验多维度的乐趣与搭建。</span> 
</p >
<br />
<p>
<span style="font-size:14px;color:#000000;">SNT基于要创造的绿洲世界后期会融合并开发我们的元宇宙世界、Gamefi游戏领域、NFT和实物商城融合领域进行深度多元化发展。</span>
</p >
<p>
 <span style="font-size:14px;"><br />
</span>
</p >
<span style="font-size:16px;"><strong>欢迎探索SNT的绿洲世界！！</strong></span><br />`;

export const INTRODUCELIST = [
  {
    id: 1,
    src: "https://snt-art.obs.cn-south-1.myhuaweicloud.com/9.jpg",
    text: "卡俄斯",
    desc: "SNT众神之王，总经理",
    content: `世界的开头始于混沌，卡俄斯是原始秩序、时间和空间的开端，卡俄斯开创了SNT的时代，SNT从此开篇。
    卡俄斯独立诞生，是无边无际的黑暗与光亮的载体，在SNT体系中属于智慧和规划的担当，无私奉献吸引了更多的人才，让SNT继续发光发亮，走的更远更稳，更有未来。`,
  },
  {
    id: 2,
    src: "https://snt-art.obs.cn-south-1.myhuaweicloud.com/2.jpg",
    text: "宙斯",
    desc: "SNT众神之王，总经理",
    content: `才华横溢，拥有扎实的技术能力和非凡的商业头脑，在SNT体系中担任大脑和智慧的角色，是引领SNT的曙光和希望，和卡俄斯一起掌管着SNT的发展和规划。
    宙斯亦为SNT的法规之神，主张宽松和宽容，一切以善为本，一切以用户为本，一切以未来文本，和卡俄斯共同创造了SNT体系，并唤醒了更多SNT的神祇创造新的绿洲。
    宙斯是SNT最为和善的神，维护着各神的关系和利益，是众神信赖的伙伴。`,
  },
  {
    id: 3,
    src: "https://snt-art.obs.cn-south-1.myhuaweicloud.com/3.jpg",
    text: "哈迪斯",
    desc: "SNT冥王，技术总监",
    content: `
    他，隐匿于黑暗之中，人们看不见他，但他又无处不在。
    他，行事冷酷无情，喜欢黑暗里独自一人，但也是如此公正无私。
    他，拥有着扎实的技术基础和独特的管理方式，维护着所有人物关系，搭建着众神沟通的桥梁。
    他，疾恶如仇，势必要将人世间的不公统统打入地狱，用哈迪斯的地狱火将之燃烧殆尽。
    他，试图创造一个新的世界，与众神一起打造SNT绿洲世界的基本版图。 
    新的未来正在到来，他和大家一样，一起期待SNT打造的新时代。
  `,
  },
  {
    id: 4,
    src: "https://snt-art.obs.cn-south-1.myhuaweicloud.com/4.jpg",
    text: "波塞冬",
    desc: "SNT海洋之神，系统架构师",
    content: `
    他，智慧与技术汇集一身。
    行事果断有魄力。
    遇事大胆不退缩。
    他，犹如SNT梦幻宇宙中的定海神针、赤膊上阵、玄妙入神、无所不能。
    在民间犹如神兵空降、生性聪明、真实有原则、行为正直无私、讨厌嫉贤妒能。
    有时，他像个追风少年。
    有时，他像个可爱孩子。
    有时，玩弹钢琴似疯子。
    有时，旅行中他是浪子。
    他，无所畏惧、潇潇洒洒。
    生活不止有诗和远方，还有SNT信念，SNT无限可能。
    `,
  },
  {
    id: 5,
    src: "https://snt-art.obs.cn-south-1.myhuaweicloud.com/5.jpg",
    text: "雅典娜",
    desc: "SNT艺术女神，首席UI设计师",
    content: `
    身为90后精英设计师的她，
    集智慧与艺术于一身，
    犹如雅典娜再世。
    面对困难和挑战时，
    如同战神一般英勇厮杀，
    用她的智慧将一个又一个的问题打倒。
    如果时代是一面屏障，
    那她就是为我们突破屏障的重要一环。
    她所打造的作品，
    被称之为SNT新时代的艺术品，
    为SNT绿洲世界打下了坚实的基础。
    `,
  },
  {
    id: 6,
    src: "https://snt-art.obs.cn-south-1.myhuaweicloud.com/6.jpg",
    text: "倪克斯",
    desc: "SNT艺术女神，财务总监",
    content: `
    倪克斯是最初的本源，不仅地位崇高，在SNT中拥有强大的力量，供给SNT所有的养分，是SNT中不可或缺的部分。
   倪克斯性格随和，不因自身力量和地位而高高在上，在SNT中经常带给众神欢乐，接触众神疑虑，但一旦遇到危险和困难，倪克斯将会是第一个冲锋陷阵的战神，所向披靡，随后凯旋而归。
    `,
  },
  {
    id: 7,
    src: "https://snt-art.obs.cn-south-1.myhuaweicloud.com/7.jpg",
    text: "阿瑞斯",
    desc: "SNT战神，产品经理",
    content: `
    SNT中战斗力最强悍的存在之一，上可九天揽月，下至五海捉鳖，担任SNT中产品经理一职，为人胆大心细，负责分开混沌，整理秩序并且一直坚守与维护着这得来不易的绿洲，也是SNT团队中非常值得信赖的伙伴。
    `,
  },
  {
    id: 8,
    src: "https://snt-art.obs.cn-south-1.myhuaweicloud.com/8.jpg",
    text: "阿尔忒弥斯",
    desc: "SNT狩猎女神，首席IP设计师",
    content: `
    向往自由、独立，阿尔忒弥斯在SNT中负责灵感和创造，她和卡俄斯共同创造了SNT的绿洲，并赋予了绿洲木土水火土在内的五行属性和对应的守护神，为SNT开启了第一代绿洲。
阿尔忒弥斯爱哭爱笑，性格随和，属于SNT中的开心果，灵感来时倾斜而注，笔墨豪挥，创作领域随性而行。
    `,
  },
];
