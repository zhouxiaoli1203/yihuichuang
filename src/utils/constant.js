const CONSTANT = {
    //户外写真
    photo_ot_xiezhen: [
        { name: '户外背胶', value: '1' },
        { name: '白胶车贴', value: '2' },
        { name: '黑胶车贴', value: '3' },
        { name: '户外单透贴', value: '4' },
        { name: '户外相纸', value: '5' },
    ],
    //户内写真
    photo_in_xiezhen: [
        { name: '户内背胶', value: '1' },
        { name: '户内高光相纸', value: '2' },
        { name: '户内海报(不带胶)', value: '3' },
        { name: '户内背喷灯片', value: '4' },
        { name: '户内写真布', value: '5' },
        { name: '户内银背', value: '6' },
        { name: '户内PVC硬片', value: '7' },
    ],
    //写真材料
    photo_materials:[
        { name: '户外背胶', value: '1' },
        { name: '白胶车贴', value: '2' },
        { name: '黑胶车贴', value: '3' },
        { name: '户外单透贴', value: '4' },
        { name: '户外相纸', value: '5' },
    ],
    paint_materials: [
        { name: '喷绘布', value: "1" },
        { name: '刀刮布', value: "2" },
    ],
    paint_types: [
        { name: '正常留白', value: "1" },
        { name: '减净边', value: "2" },
        { name: '净边打扣', value: "3" },
        { name: '留白打扣', value: "4" },
        { name: '净边穿绳打扣', value: "5" },
        { name: '留白穿绳打扣', value: "6" },
        { name: '模切', value: "7" },
    ],
    ribbon_materials: [
        { name: '缎面绶带', value: "1" },
        { name: '发泡绶带', value: "2" },
        { name: '高档发泡锦旗', value: "3" },
        { name: '高档镀金锦旗', value: "4" },
    ],
    ribbon_rules: [
        { name: '1.8*0.13米', value: "1" },
    ],
    banner_btns: [
        { name: '彩色条幅', value: '1' },
        { name: '红底条幅', value: '2' },
        { name: '锦旗', value: '3' },
    ],
    banner_materials: [
        { name: '50cm宽彩色条幅', value: '1' },
        { name: '60cm宽彩色条幅', value: '2' },
        { name: '70cm宽彩色条幅', value: '3' },
        { name: '80cm宽彩色条幅', value: '4' },
        { name: '90cm宽彩色条幅', value: '5' },
    ],
    banner_rules_zhanjia: [
        { name: '1.6*0.6米', value: '1' },
        { name: '1.8*0.8米', value: '2' },
        { name: '2*0.8米', value: '3' },
    ],
    banner_rules_jinqi: [
        { name: '0.4*0.6米', value: '1' },
        { name: '0.6*0.9米', value: '2' },
        { name: '0.7*1.1米', value: '3' },
        { name: '0.8*1.2米', value: '4' },
        { name: '0.9*1.5米', value: '5' },
    ],
    banner_types: [
        { name: '覆亮膜', value: '1' },
        { name: '覆哑膜', value: '2' },
        { name: '四角打扣', value: '3' },
        { name: '高档白杆展架', value: '4' },
        { name: '门型展架', value: '5' },
        { name: '配重x展架', value: '6' },
        { name: '全铝两用x展架', value: '7' },
    ],
    banner_types_caise: [
        { name: '打扣', value: '1', select: true, drops: [{ name: '四角打扣', value: '1' }, { name: '每隔2米打一个扣', value: '2' }] },
        { name: '缝吊耳', value: '2', select: true, drops: [{ name: '缝吊耳', value: '1' }, { name: '四角缝吊耳', value: '2' }] },
        { name: '缝筒', value: '3' },
        { name: '裁净边', value: '4' },
    ],
    armband_materials: [
        { name: '绒布款', value: "1" },
    ],
    armband_types: [
        { name: '袖章', value: "1" },
    ],
    armband_rules: [
        { name: '20cm*14cm', value: "1" },
    ],
    danye_materials:[
        { name: '市场157克铜板（130克）', value: '1' },
        { name: '市场128克铜板（110克）', value: '2' },
    ],
    danye_rules:[
        { name: '285*210', value: '1' },
        { name: '210*90', value: '2' },
        { name: '210*140', value: '3' },
        { name: '420*285', value: '4' },
    ],
    danye_all_drops:[
        {name:"对折",value:"1"},
        {name:"风琴折",value:"2"},
        {name:"包心折",value:"3"},
        {name:"对折再对折",value:"4"},
        {name:"十字折",value:"5"},
        {name:"宝塔折",value:"6"},
        {name:"风琴三折再对折",value:"7"},
        {name:"混合折",value:"8"},
        {name:"风琴四折再对折",value:"9"},
    ],
    danye_drop1:[
        {name:"2",drops:[{name:"对折",value:"1"}]},
        {name:"3",drops:[{name:"风琴折",value:"2"},{name:"包心折",value:"3"}]},
        {name:"4",drops:[{name:"风琴折",value:"2"},{name:"对折再对折",value:"4"},{name:"十字折",value:"5"},{name:"宝塔折",value:"6"}]},
        {name:"5",drops:[{name:"风琴折",value:"2"},{name:"宝塔折",value:"6"}]},
        {name:"6",drops:[{name:"风琴折",value:"2"},{name:"宝塔折",value:"6"},{name:"风琴三折再对折",value:"7"}]},
        {name:"7",drops:[{name:"风琴折",value:"2"}]},
        {name:"8",drops:[{name:"混合折",value:"8"},{name:"风琴四折再对折",value:"9"}]},
    ],
    
};


export default CONSTANT;
