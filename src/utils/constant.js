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
    ],
    //写真材料
    photo_materials: [
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
        // { name: '锦旗', value: '3' },
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
    qizhi_btns: [
        { name: '旗帜', value: '1' },
        { name: '锦旗', value: '2' },
    ],
    qizhi_materials: [
        { name: '双透彩旗', value: "1" },
        { name: '贡缎布', value: "2" },
    ],
    jinqi_materials: [
        { name: '普通发泡锦旗', value: "1" },
        { name: '普通镀金锦旗', value: "2" },
    ],
    qizhi_types: [
        {
            name: '缝筒', value: "1", select: true, drops: [
                { name: "左缝筒", value: "1" },
                { name: "上缝筒", value: "2" },
                { name: "右缝筒", value: "3" },
                { name: "左右缝筒", value: "4" },
                { name: "上下缝筒", value: "5" },
                { name: "上缝筒左缝吊耳", value: "6" },
            ]
        },
        { name: '裁净边', value: "2" },
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
    danye_materials: [
        { name: '市场157克铜板（130克）', value: '1' },
        { name: '市场128克铜板（110克）', value: '2' },
    ],
    danye_rules: [
        { name: 'A4（210*285MM）', value: '1' },
        // { name: '210*90', value: '2' },
        // { name: '210*140', value: '3' },
        { name: 'A3（420*285MM）', value: '2' },
    ],
    danye_all_drops: [
        { name: "对折", value: "1" },
        { name: "风琴折", value: "2" },
        { name: "包心折", value: "3" },
        { name: "对折再对折", value: "4" },
        { name: "十字折", value: "5" },
        { name: "宝塔折", value: "6" },
        { name: "风琴三折再对折", value: "7" },
        { name: "混合折", value: "8" },
        { name: "风琴四折再对折", value: "9" },
    ],
    danye_drop1: [
        { name: "2", value: "2", drops: [{ name: "对折", value: "1" }] },
        { name: "3", value: "3", drops: [{ name: "风琴折", value: "2" }, { name: "包心折", value: "3" }] },
        { name: "4", value: "4", drops: [{ name: "风琴折", value: "2" }, { name: "对折再对折", value: "4" }, { name: "十字折", value: "5" }, { name: "宝塔折", value: "6" }] },
        { name: "5", value: "5", drops: [{ name: "风琴折", value: "2" }, { name: "宝塔折", value: "6" }] },
        { name: "6", value: "6", drops: [{ name: "风琴折", value: "2" }, { name: "宝塔折", value: "6" }, { name: "风琴三折再对折", value: "7" }] },
        { name: "7", value: "7", drops: [{ name: "风琴折", value: "2" }] },
        { name: "8", value: "8", drops: [{ name: "混合折", value: "8" }, { name: "风琴四折再对折", value: "9" }] },
    ],
    danye_types: [
        {
            name: '折页', value: '1', select: true, dropslist1: [
                { name: "2", value: "2", drops: [{ name: "对折", value: "1" }] },
                { name: "3", value: "3", drops: [{ name: "风琴折", value: "2" }, { name: "包心折", value: "3" }] },
                { name: "4", value: "4", drops: [{ name: "风琴折", value: "2" }, { name: "对折再对折", value: "4" }, { name: "十字折", value: "5" }, { name: "宝塔折", value: "6" }] },
                { name: "5", value: "5", drops: [{ name: "风琴折", value: "2" }, { name: "宝塔折", value: "6" }] },
                { name: "6", value: "6", drops: [{ name: "风琴折", value: "2" }, { name: "宝塔折", value: "6" }, { name: "风琴三折再对折", value: "7" }] },
                { name: "7", value: "7", drops: [{ name: "风琴折", value: "2" }] },
                { name: "8", value: "8", drops: [{ name: "混合折", value: "8" }, { name: "风琴四折再对折", value: "9" }] },
            ], typelist: []
        },
    ],
    zheye_materials: [
        { name: '128g铜版纸', value: '1' },
        { name: '157g铜版纸', value: '21' },
        { name: '200g铜版纸', value: '3' },
        { name: '250g铜版纸', value: '4' },
        { name: '300g铜版纸', value: '5' },
    ],
    zheye_rules: [
        { name: '210*285', value: '1' },
        { name: '210*140', value: '2' },
        { name: '420*285', value: '3' },
    ],
    zheye_types_gongyi: [
        { name: '折页', value: '1' },
        { name: 'A4单面覆膜', value: '2' },
        { name: 'A3单面覆膜', value: '3' },
        { name: 'A4双面覆膜', value: '4' },
        { name: 'A3双面覆膜', value: '5' },
    ],
    zheyes: [
        { name: '对折页', value: '1' },
        { name: '三折页', value: '2' },
    ],
    modelTypes: [
        { name: '光膜', value: '1' },
        { name: '哑膜', value: '2' },
    ],
    buganjiao_materials: [
        { name: '普通不干胶', value: '1' },
        { name: '加胶不干胶', value: '2' },
    ],
    buganjiao_rules: [
        { name: '90*54', value: '1' },
        { name: '90*50', value: '2' },
        { name: '160*54', value: '3' },
        { name: '180*54', value: '4' },
        { name: '182*54', value: '5' },
    ],
    buganjiao_gongyi: [
        { name: '直角切成片', value: '1' },
        {
            name: '模切', value: '2', select: true, drops: [
                { name: '圆形', value: '1' },
                { name: '直角', value: '2' },
                { name: '圆角', value: '3' },
                { name: '椭圆', value: '4' },
                { name: '其他', value: '5' },
                { name: '10度圆角', value: '6' },
                { name: '15度圆角', value: '7' },
            ]
        },
        { name: '压点线', value: '3' },
        { name: '覆亮膜', value: '4' },
        { name: '覆哑膜', value: '5' },
        { name: '防晒油墨', value: '6' },
        { name: '拼咬口', value: '7' },
        {
            name: '拼大张', value: '8', inputs: [
                { changbian: "", duanbian: "" }
            ]
        },
    ],
    // buganjiao_moqie:[
    //     {name:'圆形',value:'1'},
    //     {name:'直角',value:'2'},
    //     {name:'圆角',value:'3'},
    //     {name:'椭圆',value:'4'},
    //     {name:'其他',value:'5'},
    //     {name:'10度圆角',value:'6'},
    //     {name:'15度圆角',value:'7'},
    // ],
    mingpian_btns: [
        { name: '铜版纸名片', value: '1' },
        { name: '精品纸名片', value: '2' },
        { name: '工艺名片', value: '3' },
    ],
    tongbanMates: [
        { name: '普通铜板不覆膜', value: '1' },
        { name: '普通铜板覆膜【哑膜】', value: '2' },
    ],
    tongbanRules: [
        { name: '90*50', value: '1' },
        { name: '90*54', value: '2' },
        { name: '160*54', value: '3' },
        { name: '180*54', value: '4' },
        { name: '182*54', value: '5' },
    ],

    jingpinMates: [
        { name: '刚古水文超白', value: '1' },
        { name: '刚古水文米黄', value: '2' },
        { name: '白珠光', value: '3' },
        { name: '黄珠光', value: '4' },
        { name: '瑞典环保白卡', value: '5' },
        { name: '蛋壳纹', value: '6' },
        { name: '欧洲伯爵超白纸', value: '7' },
        { name: '意大利经典竹丝纹', value: '8' },
        { name: '法国象牙卡', value: '9' },
    ],
    gongyiMates: [
        { name: '触感咖啡330克【爆款】', value: '1' },
        { name: '白针孔360克', value: '2' },
        { name: '象牙卡480克', value: '3' },
        { name: '荷兰白卡480克', value: '4' },
        { name: '黑卡500克【爆款】', value: '5' },
        { name: '冰白纸500克', value: '6' },
        { name: '爵士金属白金500克', value: '7' },
        { name: '台湾优质棉米色500克', value: '8' },
        { name: '采石白色600克', value: '9' },
        { name: '德莱克米色600克', value: '10' },
    ],
    gongyiRules: [
        { name: '90*50', value: '1' },
        { name: '90*54', value: '2' },
    ],
    tongbanTypes: [
        {
            name: '压痕', value: '1',
            drops1: [{ name: '1', value: '1' ,placeholder:"个数"}],
            drops2: [{ name: '平均压痕', value: '1' }, { name: '按文件标注', value: '2' }]
        },
        {
            name: '压点线', value: '2',
            drops1: [{ name: '1', value: '1' }],
            drops2: [{ name: '按文件标注', value: '1' }]
        },
        {
            name: '圆角', value: '3',
            drops1: [{ name: '25度', value: '1' }],
            drops2: [{ name: '1', value: '1' }, { name: '2', value: '2' }, { name: '3', value: '3' }, { name: '4', value: '4' },],
            inputs: [{ inputData: "", placeholder: "模切位置" }]
        },
        {
            name: '打孔', value: '4',
            drops1: [{ name: '3mm', value: '1' }, { name: '4mm', value: '2' }, { name: '5mm', value: '3' }, { name: '6mm', value: '4' },],
            drops2: [{ name: '1', value: '1' }],
            drops3: [{ name: '按文件标注', value: '1' }]
        },
        {
            name: '烫金', value: '5', drops1: [
                { name: '亮黄色', value: '1' },
                { name: '哑金', value: '2' },
                { name: '红金', value: '3' },
                { name: '蓝金', value: '4' },
                { name: '黑金', value: '5' },
                { name: '紫金', value: '6' },
                { name: '绿金', value: '7' },
            ], drops2: [
                { name: '单面', value: '1' },
                { name: '双面', value: '2' },
            ],
        },
        {
            name: '打码', value: '6',
            drops1: [{ name: '1', value: '1' }, { name: '2', value: '2' }],
            drops2: [{ name: "黑色", value: "1" }],
            drops3: [
                { name: '跳4', value: '1' },
                { name: '跳7', value: '2' },
                { name: '跳4和7', value: '3' },
                { name: '顺排', value: '4' },
            ],
            drops4: [{ name: '带NC.', value: '1' }, { name: '不带', value: '2' }],
            inputs: [{ inputData: "", placeholder: "起始码" }]
        },
    ],
    gongyiTypes: [
        {
            name: '圆角', value: '1', drops1: [
                { name: '25度', value: '1' },
            ], drops2: [{ name: '1', value: '1' }, { name: '2', value: '2' }, { name: '3', value: '3' }, { name: '4', value: '4' },], drops3: [
                { name: '圆形', value: '1' },
                { name: '直角', value: '2' },
                { name: '圆角', value: '3' },
                { name: '椭圆', value: '4' },
                { name: '其他', value: '5' },
                { name: '10度圆角', value: '6' },
                { name: '15度圆角', value: '7' },
            ]
        },
        {
            name: 'UV', value: '2', drops1: [
                { name: '正面', value: '1' },
                { name: '反面', value: '2' },
            ]
        },
        {
            name: '击凸', value: '3', drops1: [
                { name: '正面', value: '1' },
                { name: '反面', value: '2' },
            ]
        },
        {
            name: '压凹', value: '4', drops1: [
                { name: '正面', value: '1' },
                { name: '反面', value: '2' },
            ]
        },
        {
            name: '印金', value: '5', drops1: [
                { name: '单面', value: '1' },
                { name: '双面', value: '2' },
            ]
        },
        {
            name: '印银', value: '6', drops1: [
                { name: '单面', value: '1' },
                { name: '双面', value: '2' },
            ]
        },
        {
            name: '烫金', value: '7', drops1: [
                { name: '单面', value: '1' },
                { name: '双面', value: '2' },
            ], drops2: [
                { name: '亮黄色', value: '1' },
                { name: '哑金', value: '2' },
                { name: '红金', value: '3' },
                { name: '蓝金', value: '4' },
                { name: '黑金', value: '5' },
                { name: '紫金', value: '6' },
                { name: '绿金', value: '7' },
                { name: '银色', value: '8' },
                { name: '镭射银', value: '9' },
                { name: '珠光绿', value: '10' },
            ]
        },
    ],
    zhengfan: [
        { name: '正面', value: '1' },
        { name: '反面', value: '2' },
    ],
    danshuang: [
        { name: '单面', value: '1' },
        { name: '双面', value: '2' },
    ],
    gongyi_dushu: [
        { name: '25度', value: '1' },
    ],
    gongyi_colors: [
        { name: '亮黄色', value: '1' },
        { name: '哑金', value: '2' },
        { name: '红金', value: '3' },
        { name: '蓝金', value: '4' },
        { name: '黑金', value: '5' },
        { name: '紫金', value: '6' },
        { name: '绿金', value: '7' },
        { name: '银色', value: '8' },
        { name: '镭射银', value: '9' },
        { name: '珠光绿', value: '10' },
    ],
    guize: [
        { name: '跳4', value: '1' },
        { name: '跳7', value: '2' },
        { name: '跳4和7', value: '3' },
        { name: '顺排', value: '4' },
    ],
    caidanMates: [
        { name: '双胶纸80克(菜单/餐垫专用纸)', value: '1' },
        { name: '铜版纸157(菜单/餐垫专用纸)', value: '2' },
        { name: '铜版纸200(菜单/餐垫专用纸)', value: '3' },
    ],
    caidan_rules: [
        { name: '大度16开210*285', value: '1' },
        { name: '大度8开285*420', value: '2' },
        { name: '正度8开260*370', value: '3' },
        { name: '大度32开210*140', value: '4' },
    ],
    caidan_types: [
        {
            name: '折页', value: '1', select: true, dropslist1: [
                { name: "2", value: "2", drops: [{ name: "对折", value: "1" }] },
                { name: "3", value: "3", drops: [{ name: "风琴折", value: "2" }, { name: "包心折", value: "3" }] },
                { name: "4", value: "4", drops: [{ name: "风琴折", value: "2" }, { name: "对折再对折", value: "4" }, { name: "十字折", value: "5" }, { name: "宝塔折", value: "6" }] },
                { name: "5", value: "5", drops: [{ name: "风琴折", value: "2" }, { name: "宝塔折", value: "6" }] },
            ], typelist: []
        },
    ],
    paiziMates: [
        { name: '金箔木托授权牌', value: '1' },
        { name: '银箔木托授权牌', value: '2' },
    ],
    paiziRules: [
        { name: '18cm*24cm', value: '1' },
        { name: '24cm*34cm', value: '2' },
        { name: '30cm*40cm', value: '3' },
        { name: '35cm*50cm', value: '4' },
        { name: '40cm*60cm', value: '5' },
    ],
    paiziType: [
        { name: '直边', value: '1' },
        { name: '花边', value: '2' },
    ],
    mutuo_types: [
        { name: '款式', value: '1', select: true, drops: [{ name: '直边', value: '1' }, { name: '花边', value: '2' }] },
    ],
    xuanchuan_btns: [
        { name: '骑马钉', value: '1' },
        { name: '无线胶装', value: '2' },
    ],
    xuanchuan_mates: [
        { name: '铜版纸105克', value: '1' },
        { name: '铜版纸128克', value: '2' },
        { name: '铜版纸200克', value: '3' },
        { name: '铜版纸250克', value: '4' },
        { name: '铜版纸300克', value: '5' },
        { name: '双胶纸70克', value: '6' },
        { name: '双胶纸80克', value: '7' },
        { name: '双胶纸100克', value: '8' },
        { name: '双胶纸120克', value: '9' },
        { name: '道林双胶纸80克', value: '10' },
    ],
    xuanchuan_mates_jiaozhuang: [
        { name: '铜版纸200克', value: '3' },
        { name: '铜版纸250克', value: '4' },
        { name: '铜版纸300克', value: '5' },
    ],
    xuanchuan_rules: [
        { name: '大度16开285*210', value: '1' },
        { name: '正度16开260*185', value: '2' },
        { name: '大度32开210*140', value: '3' },
        { name: '正度32开185*130', value: '4' },
        { name: '大度8开420*285', value: '5' },
        { name: '正度8开370*260', value: '6' },
        { name: '竖版A4规格297*210', value: '7' },
    ],
    xuanchuan_gongyi: [
        { name: '封面亮膜', value: '1' },
        { name: '封面哑膜', value: '2' },
        { name: '触感膜', value: '3' },
        { name: '模切', value: '4' },
        {
            name: '压纹',
            value: '5',
            select: true,
            drops: [
                { name: '碎皮纹', value: '1' },
                { name: '粗布纹', value: '2' },
                { name: '细布纹', value: '3' },
                { name: '梨纹', value: '4' },
                { name: '金沙纹', value: '5' },
                { name: '条纹', value: '6' },
                { name: '莱妮纹', value: '7' },
                { name: '麻布纹', value: '8' },
                { name: '陶纹', value: '9' },
                { name: '针孔纹', value: '10' },
            ],
        },
        {
            name: '击凸',
            value: '6',
            items: [{ hasDrop: false, changbian: '', duanbian: '' }],
        },
        {
            name: 'UV',
            value: '7',
            select: true,
            plshd: '类型',
            drops: [
                { name: '厚UV', value: '1' },
                { name: '磨砂UV', value: '2' },
            ],
            items: [{ hasDrop: true, drop: '', changbian: '', duanbian: '' }],
        },
        {
            name: '烫金',
            value: '8',
            select: true,
            plshd: '颜色',
            drops: [
                { name: '亮黄金', value: '1' },
                { name: '哑黄金', value: '2' },
                { name: '哑银', value: '3' },
                { name: '亮银', value: '4' },
                { name: '珠光白', value: '5' },
                { name: '大亮点红金', value: '6' },
                { name: '红金', value: '7' },
                { name: '蓝金', value: '8' },
                { name: '绿金', value: '9' },
                { name: '黑金', value: '10' },
                { name: '介质流沙', value: '11' },
                { name: '介质迷宫', value: '12' },
            ],
            items: [{ hasDrop: true, drop: '', changbian: '', duanbian: '' }],
        },
        {
            name: '浮雕烫',
            value: '9',
            plshd: '颜色',
            select: true,
            drops: [
                { name: '亮黄金', value: '1' },
                { name: '哑黄金', value: '2' },
                { name: '哑银', value: '3' },
                { name: '亮银', value: '4' },
                { name: '珠光白', value: '5' },
                { name: '大亮点红金', value: '6' },
                { name: '红金', value: '7' },
                { name: '蓝金', value: '8' },
                { name: '绿金', value: '9' },
                { name: '黑金', value: '10' },
                { name: '介质流沙', value: '11' },
                { name: '介质迷宫', value: '12' },
            ],
            items: [{ hasDrop: true, drop: '', changbian: '', duanbian: '' }],
        },
        { name: '塑封', value: '10' },
        {
            name: '材料颜色',
            value: '11',
            select: true,
            drops: [
                { name: '米白', value: '1' },
                { name: '米黄', value: '2' },
                { name: '超白', value: '3' },
            ],
        },
        {
            name: '封面封底勒口',
            value: '12',
            inputs: true,
            kuandu: '',
        },
        {
            name: '书脊',
            value: '13',
            select: true,
            drops: [
                { name: '延伸封面', value: '1' },
                { name: '延伸封底', value: '2' },
                { name: '已设计', value: '3' },
                { name: '自行调整', value: '4' },
            ],
        },
        {
            name: '画册顺序',
            value: '14',
            select: true,
            drops: [
                { name: '翻看顺序', value: '1' },
                { name: '连版顺序', value: '2' },
            ],
        },
    ],
    designSearch: [
        { name: '全部', id: '0' },
        {
            name: '广告物料', id: '1', level: [
                { name: '全部' },
                {
                    name: '写真', level: [
                        { name: '全部' },
                        { name: '展板' },
                        { name: '餐饮美食' },
                        { name: '教育培训' },
                        { name: '商务金融' },
                        { name: '互联网科技' },
                        { name: '美容健身' },
                        { name: '地产家居' },
                        { name: '酒店旅游' },
                        { name: '医疗健康' },
                        { name: '美妆服饰' },
                        { name: '生活服务' },
                        { name: '汽车' },
                        { name: '婚礼婚庆' },
                        { name: '科技数码' },
                        { name: '家居装修' },
                        { name: '房产中介' },
                        { name: '运动健身' },
                        { name: '旅游出行' },
                    ]
                },
                {
                    name: '展板', level: [
                        { name: '全部' },
                        { name: '餐饮美食' },
                        { name: '教育培训' },
                        { name: '商务金融' },
                        { name: '互联网科技' },
                        { name: '美容健身' },
                        { name: '地产家居' },
                        { name: '酒店旅游' },
                        { name: '医疗健康' },
                        { name: '美妆服饰' },
                        { name: '生活服务' },
                        { name: '汽车' },
                        { name: '婚礼婚庆' },
                        { name: '科技数码' },
                        { name: '家居装修' },
                        { name: '房产中介' },
                        { name: '运动健身' },
                        { name: '旅游出行' },
                    ]
                },
                { name: '旗帜' },
                {
                    name: '展架', level: [
                        { name: '全部' },
                        { name: '教育培训' },
                        { name: '餐饮美食' },
                        { name: '互联网科技' },
                        { name: '科技数码' },
                        { name: '汽车' },
                        { name: '旅行出行' },
                        { name: '运动健身' },
                        { name: '美容养生' },
                        { name: '文体娱乐' },
                        { name: '商务金融' },
                        { name: '地产家居' },
                        { name: '酒店旅游' },
                        { name: ' 医疗健康' },
                        { name: '婚礼婚庆' },
                        { name: '旅游出行' },
                        { name: '生活服务' },
                    ]
                },
            ]
        },
        {
            name: '企业定制', id: '2', level: [
                { name: '全部' },
                { name: '企业宣传册' },
                { name: '工作证' },
                { name: '产品手册' },
                {
                    name: '纪念册', level: [
                        { name: '全部' },
                        { name: '金融' },
                        { name: '餐饮美食' },
                        { name: '健康医疗' },
                        { name: '公益环保' },
                        { name: '美妆服饰' },
                        { name: '党政教育' },
                        { name: '互联网科技' },
                        { name: '休闲娱乐' },
                        { name: '商务科技' }
                    ]
                },
            ]
        },
        {
            name: '常用印刷品', id: '3', level: [
                { name: '全部' },
                {
                    name: '宣传单页', level: [
                        { name: '全部' },
                        { name: '互联网科技' },
                        { name: '教育培训' },
                        { name: '餐饮美食' },
                        { name: '旅游出行' },
                        { name: '运动健身' },
                        { name: '美容养生' },
                        { name: '通用' },
                        { name: '美容健身' },
                        { name: '汽车养护' },
                        { name: '服装鞋包' },
                        { name: '文体娱乐' },

                    ]
                },
                {
                    name: '折页', level: [
                        { name: '全部' },
                        { name: '教育培训' },
                        { name: '餐饮美食' },
                        { name: '健康医疗' },
                        { name: '互联网科技' },
                        { name: '汽车' },
                        { name: '旅游出行' },
                        { name: '商务金融' }
                    ]
                },
                {
                    name: '名片', level: [
                        { name: '全部' },
                        { name: ' 通用' },
                        { name: '教育培训' },
                        { name: '互联网科技' },
                        { name: '餐饮美食' },
                        { name: '建筑装修' },
                        { name: '婚庆服务' },
                        { name: '汽车' },
                        { name: '房产家居' },
                        { name: '广告设计' },
                        { name: '快递物流' },
                        { name: '健身美容' },
                        { name: '商务金融' },
                        { name: '文体娱乐' },
                        { name: '健康医疗' },
                        { name: '公益环保' },
                        { name: '家居装修' },
                        { name: '美妆服饰' },
                        { name: '母婴护理' },
                        { name: '金融' },
                        { name: '旅游出行' },
                        { name: '党政教育' },
                        { name: '婚庆婚礼' }
                    ]
                },
                {
                    name: 'PVC卡', level: [
                        { name: '全部' },
                        { name: ' 通用' },
                        { name: '教育培训' },
                        { name: '互联网科技' },
                        { name: '餐饮美食' },
                        { name: '建筑装修' },
                        { name: '婚庆服务' },
                        { name: '汽车' },
                        { name: '房产家居' },
                        { name: '广告设计' },
                        { name: '快递物流' },
                        { name: '健身美容' },
                        { name: '商务金融' },
                        { name: '文体娱乐' },
                        { name: '健康医疗' },
                        { name: '公益环保' },
                        { name: '家居装修' },
                        { name: '美妆服饰' },
                        { name: '母婴护理' },
                        { name: '金融' },
                        { name: '旅游出行' },
                        { name: '党政教育' },
                        { name: '婚庆婚礼' },
                        { name: '美容美发' },
                        { name: '运动健身' },
                        { name: '娱乐会所' },
                        { name: '商场' },
                    ]
                },
                {
                    name: '不干胶', level: [
                        { name: '全部' },
                        { name: ' 餐饮' },
                        { name: '花艺' },
                    ]
                },
                {
                    name: '手提袋', level: [
                        { name: '全部' },
                        { name: '教育培训' },
                        { name: '餐饮美食' },
                        { name: '科技互联网' },
                        { name: '医疗' },
                        { name: '展会展览' },
                    ]
                },
            ]
        },
        {
            name: '其他印刷', id: '4', level: [
                { name: '全部' },
                { name: '菜单' },
                { name: '信封' },
                { name: '档案袋' },
                {
                    name: '标签纸', level: [
                        { name: '全部' },
                        { name: ' 餐饮' },
                        { name: '花艺' },
                    ]
                },
                { name: '红包对联' },
            ]
        },
    ],

};


export { CONSTANT };
