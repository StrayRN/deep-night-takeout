// Canonical content source. Compatibility exports at the bottom keep
// the current logic layer reusable while the app consumes the richer schema.

export const GAME_DATA = {
  meta: {
    id: 'deep-night-takeout',
    title: '深夜食堂外：请放柜，谢谢',
    shortTitle: '深夜食堂外',
    subtitle: '一个关于手机下单、柜机现场与外卖权益谈判的互动策略游戏',
    oneLiner: '一个关于校园外卖权益被层层谈判的互动策略游戏。',
    tagline:
      '你会在 7 毛、4 毛与免费后的三个制度阶段里，下单、补地址、写备注、接电话、看现场，试着保住今晚的晚饭，也推动规则变化。'
  },
  stats: [
    {
      id: 'clarity',
      label: '信息清晰度',
      description: '地址、备注、指定柜位是否说得足够清楚。'
    },
    {
      id: 'firmness',
      label: '沟通坚定度',
      description: '遇到推诿时，你会不会明确坚持自己的要求。'
    },
    {
      id: 'evidence',
      label: '证据完整度',
      description: '是否截图、拍照并保留对话、照片与订单记录。'
    },
    {
      id: 'pressure',
      label: '反馈推进度',
      description: '你是否把问题推向平台、学校或更高层面的介入。'
    }
  ],
  chapters: [
    {
      id: 'stage-1',
      label: '第一幕',
      title: '7 毛时代',
      subtitle: '旧秩序下的隐性不公平',
      intro:
        '外卖柜收费 0.7 元。骑手通常不愿意入柜，但学校仍默许把餐放在寝室楼下台阶。矛盾已经存在，只是被“还能拿到饭”的现实暂时压住了。',
      summary: {
        title: '旧秩序仍能勉强运转',
        body:
          '这一幕的重点不是彻底失控，而是隐性不公平。规则没有明说谁该承担额外成本，于是每一单都靠备注、解释、体谅和妥协临时拼起来。',
        outcomes: {
          low: '旧秩序继续靠“还能放楼下”凑合运行。你吃到了饭，但也几乎把备注权和要求权一起让掉了。',
          mid: '旧秩序表面还能维持，你至少让对方知道这不是一句“都这样”的小事，但改变还远没开始。',
          high: '旧秩序没有立刻改变，但你已经把“将就和平”背后的隐性不公平翻到了台面上。'
        }
      },
      events: [
        {
          id: 'stage1-event1',
          sceneType: 'phone_order',
          kicker: '22:42 晚饭到了',
          title: '你写明“请放南门 3 号柜”，对方却说要打赏才愿意入柜',
          scene:
            '你在手机里补了地址和备注。确认订单没多久，骑手来电：“柜子要钱的。你要是一定想放进去，就补个打赏。我也不能白搭这个钱吧。” 这时，备注写得再清楚，也还要落到一通电话里谈。',
          screen: {
            stepOrder: ['menu', 'checkout'],
            topNotice: '远距离配送，配送费原价上调',
            shop: {
              name: '老灶台·江西小炒（西丽店）',
              rating: '4.9',
              monthlySales: '1000+',
              eta: '约30分钟',
              serviceTags: ['蜂鸟准时达', '食无忧'],
              promoText: '20减12｜30减16｜40减20'
            },
            menuSections: [
              {
                id: 'signature',
                title: '本店招牌拿手菜',
                accent: 'TOP',
                items: [
                  {
                    id: 'ganjiao-beef',
                    name: '余干辣椒炒肉',
                    subtitle: '下饭国民菜',
                    price: 28.8,
                    originalPrice: 38,
                    badge: 'TOP1'
                  },
                  {
                    id: 'nongjia-bowl',
                    name: '农家一碗香',
                    subtitle: '辣香下饭',
                    price: 28.8,
                    originalPrice: 38,
                    badge: 'TOP2'
                  },
                  {
                    id: 'ningdu-duck',
                    name: '宁都碎鸭',
                    subtitle: '重辣耐嚼',
                    price: 29.8,
                    originalPrice: 38,
                    badge: 'TOP3'
                  }
                ]
              }
            ],
            cartPreset: [
              {
                slot: 'main',
                menuItemId: 'ganjiao-beef',
                quantity: 1
              },
              {
                slot: 'fixed',
                id: 'rice',
                title: '长粒香白米饭',
                price: 3,
                quantity: 1
              }
            ],
            addressKeywords: [
              {
                id: 'campus',
                label: '校区',
                selectionMode: 'single',
                keywords: [
                  {
                    id: 'campus-ziping',
                    text: '紫荆校区',
                    effects: { clarity: 1 }
                  },
                  {
                    id: 'campus-north',
                    text: '北区',
                    effects: { clarity: 1 }
                  }
                ]
              },
              {
                id: 'dorm',
                label: '楼栋',
                selectionMode: 'single',
                keywords: [
                  {
                    id: 'dorm-11',
                    text: '梅园 11 舍',
                    effects: { clarity: 1 }
                  },
                  {
                    id: 'dorm-9',
                    text: '松园 9 舍',
                    effects: { clarity: 1 }
                  }
                ]
              },
              {
                id: 'locker',
                label: '指定柜',
                selectionMode: 'single',
                keywords: [
                  {
                    id: 'south-locker-3',
                    text: '南门 3 号柜',
                    effects: { clarity: 1 }
                  },
                  {
                    id: 'west-locker-1',
                    text: '西门 1 号柜',
                    effects: { clarity: 1 }
                  }
                ]
              },
              {
                id: 'spot',
                label: '补充定位',
                selectionMode: 'single',
                keywords: [
                  {
                    id: 'east-stairs',
                    text: '东侧台阶旁',
                    effects: { clarity: 1 }
                  },
                  {
                    id: 'security-room',
                    text: '保安亭对面',
                    effects: { clarity: 1 }
                  }
                ]
              }
            ],
            noteKeywords: [
              {
                id: 'delivery',
                label: '送达要求',
                selectionMode: 'multi',
                keywords: [
                  {
                    id: 'put-in-locker',
                    text: '请放柜',
                    effects: {}
                  },
                  {
                    id: 'dont-leave-ground',
                    text: '不要放地上',
                    effects: {}
                  }
                ]
              },
              {
                id: 'target',
                label: '指定柜',
                selectionMode: 'multi',
                keywords: [
                  {
                    id: 'use-target-locker',
                    text: '指定南门 3 号柜',
                    effects: {}
                  }
                ]
              },
              {
                id: 'call',
                label: '沟通方式',
                selectionMode: 'multi',
                keywords: [
                  {
                    id: 'read-note-first',
                    text: '来电前先看备注',
                    effects: { firmness: 1 }
                  }
                ]
              }
            ],
            commPrompt: {
              channel: '骑手来电',
              title: '电话接通',
              message:
                '“柜子要钱的。你要是想放进去，就补个打赏。我也不能白搭这个钱吧。”',
              hint: '你已经把指定柜写进备注，对方却把履约变成了临场议价。'
            },
            orderPreview: {
              deliveryMode: '立即送出',
              eta: '预计 15:31-15:46 送达',
              packagingFee: 3,
              deliveryFee: {
                original: 6,
                current: 0,
                note: '惊喜免配送费'
              },
              discountRows: [
                {
                  label: '平台红包',
                  value: '-16'
                },
                {
                  label: '下单返福利',
                  value: '返 3 元红包'
                }
              ],
              totalLabel: '已优惠 ¥31.2',
              payLabel: '立即支付'
            }
          },
          choices: [
            {
              id: 'stage1-event1-choice1',
              text: '直接转 1 元，先把这一单处理掉',
              effects: {
                clarity: 0,
                firmness: -1,
                evidence: 0,
                pressure: -1
              },
              next: {
                type: 'event',
                target: 'stage1-event2'
              },
              commentary:
                '这一单大概率能进柜，但你默认了“额外付费才配合备注”的私人议价。'
            },
            {
              id: 'stage1-event1-choice2',
              text: '先截图，再明确要求按备注放入指定柜',
              effects: {
                clarity: 2,
                firmness: 1,
                evidence: 2,
                pressure: 0
              },
              next: {
                type: 'event',
                target: 'stage1-event2'
              },
              commentary:
                '你把要求说清，也把对话留了下来。这不是吵架，而是在把履约边界写实。'
            },
            {
              id: 'stage1-event1-choice3',
              text: '改口同意放楼下台阶，先把饭拿到手',
              effects: {
                clarity: -1,
                firmness: -1,
                evidence: 0,
                pressure: 0
              },
              next: {
                type: 'event',
                target: 'stage1-event2'
              },
              commentary:
                '你减少了眼前拉扯，也顺手撤回了“指定柜”这一要求。问题没解决，只是往后推了。'
            }
          ]
        },
        {
          id: 'stage1-event2',
          sceneType: 'locker_scene',
          kicker: '23:05 订单完成',
          title: '结果落在楼下台阶边，旧秩序仍然默认“这也算送到了”',
          scene:
            '你下楼后，餐盒靠在台阶边，离指定柜不远，却没有进柜。平台弹出满意度评价，学校也没有专门入口。旧秩序里，一切都像“虽然不太对，但也不是大事”。',
          screen: {
            backgroundImage: './assets/locker-stage1.svg',
            overlay: {
              time: '23:05',
              weather: '闷热无雨',
              statusTag: '未进指定柜',
              headline: '订单已送达',
              primaryStatus: '餐盒靠在楼下台阶边',
              secondaryStatus: '南门 3 号柜未被使用',
              location: '梅园 11 舍楼下'
            },
            evidenceHints: [
              '楼下台阶边位置可见',
              '指定柜未被使用',
              '订单状态已显示送达'
            ],
            actionLabel: '你准备怎么处理这一单？'
          },
          choices: [
            {
              id: 'stage1-event2-choice1',
              text: '点个一般，写一句“备注未执行”就算了',
              effects: {
                clarity: 0,
                firmness: 0,
                evidence: 1,
                pressure: 1
              },
              next: {
                type: 'chapter',
                target: 'stage-2'
              },
              commentary:
                '你留下了轻量反馈，但在旧秩序里，这更像把不满放进了系统的静音区。'
            },
            {
              id: 'stage1-event2-choice2',
              text: '整理截图，正式投诉“索要打赏后才愿入柜”',
              effects: {
                clarity: 1,
                firmness: 1,
                evidence: 2,
                pressure: 2
              },
              next: {
                type: 'chapter',
                target: 'stage-2'
              },
              commentary:
                '你把这次摩擦从“沟通不顺”推进到了“履约不当”。平台也许未必立刻处理，但证据已经开始积累。'
            },
            {
              id: 'stage1-event2-choice3',
              text: '什么都不填，告诉自己下次早点下楼',
              effects: {
                clarity: -1,
                firmness: -1,
                evidence: -1,
                pressure: -1
              },
              next: {
                type: 'chapter',
                target: 'stage-2'
              },
              commentary:
                '你把这次不快解释成自己的时间安排问题，系统也就顺势把责任从履约端挪开了。'
            }
          ]
        }
      ]
    },
    {
      id: 'stage-2',
      label: '第二幕',
      title: '4 毛时代',
      subtitle: '规则先变，成本没人愿意接',
      intro:
        '学校禁止骑手骑车进入宿舍区，也不再允许把餐大面积堆在楼下。外卖柜被鼓励使用，但仍然收费。规则变了，成本却没有被明确接住。',
      summary: {
        title: '冲突被从后台推到了前台',
        body:
          '这一幕最明显的变化，不是大家忽然变坏了，而是原本含混的成本被制度调整直接推到了现场。平台仍然抽身，学校只改规则，不补执行，用户开始承接最直接的混乱。',
        outcomes: {
          low: '规则突变后，成本继续向下掉。你感受到的不是秩序，而是“谁更弱，谁来兜底”。',
          mid: '冲突升级了，但你开始把零散的不满整理成可处理的问题，规则的漏洞被你一点点指出来。',
          high: '在最混乱的阶段，你没有只顾着自救，而是持续留证与施压，让“成本到底该谁承担”成为无法回避的问题。'
        }
      },
      events: [
        {
          id: 'stage2-event1',
          sceneType: 'phone_order',
          kicker: '21:58 晚高峰',
          title: '宿舍区限制生效后，骑手问：“我先帮你垫，还是你直接打赏我？”',
          scene:
            '学校已经禁止骑手进入宿舍区。你在确认订单页看到新的配送提醒，电话随即打来：“现在不能进去，也不能乱放。柜子还收费。你是让我先垫，还是你直接转给我？”',
          screen: {
            stepOrder: ['menu', 'checkout'],
            topNotice: '宿舍区限行，建议使用外卖柜取餐',
            shop: {
              name: '老灶台·江西小炒（西丽店）',
              rating: '4.9',
              monthlySales: '1000+',
              eta: '约36分钟',
              serviceTags: ['宿舍区限行', '蜂鸟准时达'],
              promoText: '满 39 减 1｜满 68 减 2｜免配送费'
            },
            menuSections: [
              {
                id: 'night-special',
                title: '晚高峰下饭菜',
                accent: '热卖',
                items: [
                  {
                    id: 'ganjiao-beef',
                    name: '余干辣椒炒肉',
                    subtitle: '爆单加急',
                    price: 28.8,
                    originalPrice: 38,
                    badge: '热卖'
                  },
                  {
                    id: 'stewed-pig-feet',
                    name: '开胃猪脚',
                    subtitle: '汤汁更怕落地',
                    price: 41.8,
                    originalPrice: 52,
                    badge: '夜宵'
                  },
                  {
                    id: 'fried-eggplant',
                    name: '豉香茄子煲',
                    subtitle: '趁热更香',
                    price: 24.8,
                    originalPrice: 32,
                    badge: '折扣'
                  }
                ]
              }
            ],
            cartPreset: [
              {
                slot: 'main',
                menuItemId: 'ganjiao-beef',
                quantity: 1
              },
              {
                slot: 'fixed',
                id: 'rice',
                title: '长粒香白米饭',
                price: 3,
                quantity: 1
              }
            ],
            addressKeywords: [
              {
                id: 'campus',
                label: '校区',
                selectionMode: 'single',
                keywords: [
                  {
                    id: 'campus-ziping',
                    text: '紫荆校区',
                    effects: { clarity: 1 }
                  },
                  {
                    id: 'campus-south',
                    text: '南区',
                    effects: { clarity: 1 }
                  }
                ]
              },
              {
                id: 'dorm',
                label: '宿舍区',
                selectionMode: 'single',
                keywords: [
                  {
                    id: 'dorm-meiyuan',
                    text: '梅园宿舍区',
                    effects: { clarity: 1 }
                  },
                  {
                    id: 'dorm-songyuan',
                    text: '松园宿舍区',
                    effects: { clarity: 1 }
                  }
                ]
              },
              {
                id: 'locker',
                label: '指定柜',
                selectionMode: 'single',
                keywords: [
                  {
                    id: 'west-locker-2',
                    text: '西门 2 号柜',
                    effects: { clarity: 1 }
                  },
                  {
                    id: 'south-locker-4',
                    text: '南门 4 号柜',
                    effects: { clarity: 1 }
                  }
                ]
              }
            ],
            noteKeywords: [
              {
                id: 'delivery',
                label: '送达要求',
                selectionMode: 'multi',
                keywords: [
                  {
                    id: 'free-locker-first',
                    text: '请优先放柜',
                    effects: {}
                  },
                  {
                    id: 'ignore-ground',
                    text: '不要放地上',
                    effects: {}
                  },
                  {
                    id: 'no-tip',
                    text: '不额外打赏',
                    effects: { firmness: 1 }
                  }
                ]
              },
              {
                id: 'call',
                label: '电话说明',
                selectionMode: 'multi',
                keywords: [
                  {
                    id: 'check-note-before-call',
                    text: '电话前请先看备注',
                    effects: { firmness: 1 }
                  }
                ]
              }
            ],
            commPrompt: {
              channel: '骑手来电',
              title: '规则刚变，议价更直接了',
              message:
                '“现在不能进去，也不能乱放。柜子要 4 毛。你是让我先垫，还是你直接打赏我？”',
              hint: '学校只改了规则，没有给出稳定替代方案，平台也没有替你接住这一步。'
            },
            orderPreview: {
              deliveryMode: '立即送出',
              eta: '预计 22:25-22:40 送达',
              packagingFee: 3,
              deliveryFee: {
                original: 6,
                current: 0.4,
                note: '柜费未含'
              },
              discountRows: [
                {
                  label: '平台红包',
                  value: '-12'
                },
                {
                  label: '学校限行提醒',
                  value: '配送规则变更'
                }
              ],
              totalLabel: '预计到手 ¥20.2',
              payLabel: '提交订单'
            }
          },
          choices: [
            {
              id: 'stage2-event1-choice1',
              text: '补 4 毛，让他先把这一单塞进柜里',
              effects: {
                clarity: 0,
                firmness: -1,
                evidence: 0,
                pressure: -1
              },
              next: {
                type: 'event',
                target: 'stage2-event2'
              },
              commentary:
                '你把制度成本临时买单了。这一单也许更顺，但问题被默认为可以继续外包给用户。'
            },
            {
              id: 'stage2-event1-choice2',
              text: '重复备注和柜号，并说明你不会额外打赏',
              effects: {
                clarity: 2,
                firmness: 2,
                evidence: 1,
                pressure: 0
              },
              next: {
                type: 'event',
                target: 'stage2-event2'
              },
              commentary:
                '你把问题重新拉回订单本身：备注写了什么、平台卖的服务是什么，不是靠现场加钱补出来的。'
            },
            {
              id: 'stage2-event1-choice3',
              text: '保存通话记录，明确表示若落地将立刻投诉',
              effects: {
                clarity: 1,
                firmness: 1,
                evidence: 2,
                pressure: 2
              },
              next: {
                type: 'event',
                target: 'stage2-event2'
              },
              commentary:
                '你把这次通话从“商量一下”变成“后果可追”。在混乱里，证据比情绪更有用。'
            }
          ]
        },
        {
          id: 'stage2-event2',
          sceneType: 'locker_scene',
          kicker: '22:10 现场一片狼藉',
          title: '你到场后发现外卖被直接扔在地上，备注和沟通都被无视',
          scene:
            '你按电话里说的地点赶过去，只看到几袋外卖散在警戒线旁的地面上。你的那份也在里面。备注没用，电话没用，规则调整也没换来可执行的新秩序。',
          screen: {
            backgroundImage: './assets/locker-stage2.svg',
            overlay: {
              time: '22:10',
              weather: '夜间闷热',
              statusTag: '地面散落',
              headline: '已送达，但未履约',
              primaryStatus: '外卖落在警戒线旁地面',
              secondaryStatus: '备注和沟通均被无视',
              location: '宿舍区入口警戒线'
            },
            evidenceHints: [
              '地面散放可见',
              '同批外卖多袋落地',
              '电话记录与备注可对照'
            ],
            actionLabel: '你准备怎么回应这次落地？'
          },
          choices: [
            {
              id: 'stage2-event2-choice1',
              text: '先把自己的外卖捡走，顺手拍一张照留底',
              effects: {
                clarity: 0,
                firmness: 0,
                evidence: 2,
                pressure: 1
              },
              next: {
                type: 'chapter',
                target: 'stage-3'
              },
              commentary:
                '你保住了这顿饭，也留下了最低限度的证据，但系统层面的追问还没有真正展开。'
            },
            {
              id: 'stage2-event2-choice2',
              text: '现场拍照并提交平台投诉，强调“备注和沟通都被无视”',
              effects: {
                clarity: 1,
                firmness: 1,
                evidence: 2,
                pressure: 3
              },
              next: {
                type: 'chapter',
                target: 'stage-3'
              },
              commentary:
                '你把这次狼狈组织成了一条可处理的履约证据链，平台终于不能只看到“订单已完成”。'
            },
            {
              id: 'stage2-event2-choice3',
              text: '把照片和经过一起反馈给学校，追问禁入后的替代方案',
              effects: {
                clarity: 1,
                firmness: 0,
                evidence: 1,
                pressure: 2
              },
              next: {
                type: 'chapter',
                target: 'stage-3'
              },
              commentary:
                '你没有只追究骑手个人，而是把矛头指向治理缺口：规则先改了，谁来接住执行？'
            },
            {
              id: 'stage2-event2-choice4',
              text: '在群里吐槽两句，外卖照吃',
              effects: {
                clarity: 0,
                firmness: -1,
                evidence: 0,
                pressure: 0
              },
              next: {
                type: 'chapter',
                target: 'stage-3'
              },
              commentary:
                '情绪得到了出口，但问题仍然停留在“大家都知道会发生”的层面。'
            }
          ]
        }
      ]
    },
    {
      id: 'stage-3',
      label: '第三幕',
      title: '免费后的新常态',
      subtitle: '收费缓解了，执行问题仍在',
      intro:
        '在持续投诉与反馈后，入柜价格先降到 0.4 元，后来又被调为免费。存柜率明显提升，但“柜子免费”并不自动等于“服务到位”。',
      summary: {
        title: '免费不是终点，只是换了问题',
        body:
          '这一幕里，最显眼的收费问题已经缓解，但执行质量、履约意识和持续监督依然决定着你能不能真正收到一份被妥当处理的外卖。制度前进了，现场未必同步。',
        outcomes: {
          low: '免费并没有自动修复执行。制度看似前进了，但如果没人追问，很多餐还是会被随手扔回现实。',
          mid: '收费问题缓解后，你仍在用沟通和记录维护自己的权益，执行层面的缝隙开始被看见。',
          high: '免费后的新常态不再只是“能不能放柜”，而是“写明的要求能否被稳定执行”。你把监督推到了更制度化的位置。'
        }
      },
      events: [
        {
          id: 'stage3-event1',
          sceneType: 'phone_order',
          kicker: '23:21 零点前最后一单',
          title: '柜子免费后，对方又说“不能进校园”，未经同意改投别柜',
          scene:
            '这一次柜子已经免费。你照样在手机里写了指定柜和补充说明，骑手却发来消息：“里面进不去，我给你放北门门口的柜了。” 收费问题缓解了，执行层面的偷懒却还在。',
          screen: {
            stepOrder: ['menu', 'checkout'],
            topNotice: '外卖柜已免费，送达率提升中',
            shop: {
              name: '老灶台·江西小炒（西丽店）',
              rating: '4.9',
              monthlySales: '1000+',
              eta: '约28分钟',
              serviceTags: ['外卖柜免费', '夜宵档'],
              promoText: '券后约 ¥18.8｜共减 ¥25.2'
            },
            menuSections: [
              {
                id: 'late-night',
                title: '零点前还在爆单',
                accent: '夜宵',
                items: [
                  {
                    id: 'ganjiao-beef',
                    name: '余干辣椒炒肉',
                    subtitle: '稳定下饭',
                    price: 28.8,
                    originalPrice: 38,
                    badge: 'TOP1'
                  },
                  {
                    id: 'pig-feet-hotpot',
                    name: '开胃猪脚',
                    subtitle: '汤汁更怕雨天',
                    price: 41.8,
                    originalPrice: 52,
                    badge: '热卖'
                  },
                  {
                    id: 'sour-beans-mince',
                    name: '酸豆角肉沫',
                    subtitle: '适合深夜白饭',
                    price: 22.8,
                    originalPrice: 29,
                    badge: '特价'
                  }
                ]
              }
            ],
            cartPreset: [
              {
                slot: 'main',
                menuItemId: 'ganjiao-beef',
                quantity: 1
              },
              {
                slot: 'fixed',
                id: 'rice',
                title: '长粒香白米饭',
                price: 3,
                quantity: 1
              }
            ],
            addressKeywords: [
              {
                id: 'campus',
                label: '校区',
                selectionMode: 'single',
                keywords: [
                  {
                    id: 'campus-ziping',
                    text: '紫荆校区',
                    effects: { clarity: 1 }
                  },
                  {
                    id: 'campus-tech',
                    text: '科技园片区',
                    effects: { clarity: 1 }
                  }
                ]
              },
              {
                id: 'dorm',
                label: '宿舍区',
                selectionMode: 'single',
                keywords: [
                  {
                    id: 'dorm-meiyuan',
                    text: '梅园宿舍区',
                    effects: { clarity: 1 }
                  },
                  {
                    id: 'dorm-wutong',
                    text: '梧桐宿舍区',
                    effects: { clarity: 1 }
                  }
                ]
              },
              {
                id: 'locker',
                label: '指定柜',
                selectionMode: 'single',
                keywords: [
                  {
                    id: 'inner-locker-2',
                    text: '校内 2 号柜',
                    effects: { clarity: 1 }
                  },
                  {
                    id: 'north-gate-locker',
                    text: '北门门口柜',
                    effects: { clarity: 1 }
                  }
                ]
              }
            ],
            noteKeywords: [
              {
                id: 'delivery',
                label: '送达要求',
                selectionMode: 'multi',
                keywords: [
                  {
                    id: 'free-locker-target',
                    text: '请按指定柜投放',
                    effects: {}
                  },
                  {
                    id: 'no-door-locker',
                    text: '未经同意不要改投别柜',
                    effects: { firmness: 1 }
                  }
                ]
              },
              {
                id: 'call',
                label: '沟通方式',
                selectionMode: 'multi',
                keywords: [
                  {
                    id: 'message-first',
                    text: '先发消息说明原因',
                    effects: {}
                  },
                  {
                    id: 'check-note-first',
                    text: '来电前先看备注',
                    effects: { firmness: 1 }
                  }
                ]
              }
            ],
            commPrompt: {
              channel: '骑手消息',
              title: '收费问题消失了，借口换了一种',
              message:
                '“里面进不去，我给你放北门门口的柜了。”',
              hint: '现在不是“柜子要不要钱”，而是“写明的要求能不能被认真执行”。'
            },
            orderPreview: {
              deliveryMode: '立即送出',
              eta: '预计 23:48-00:03 送达',
              packagingFee: 3,
              deliveryFee: {
                original: 6,
                current: 0,
                note: '免配送费'
              },
              discountRows: [
                {
                  label: '平台红包',
                  value: '-16'
                },
                {
                  label: '夜宵活动',
                  value: '再减 ¥3'
                }
              ],
              totalLabel: '券后约 ¥18.8',
              payLabel: '去结算'
            }
          },
          choices: [
            {
              id: 'stage3-event1-choice1',
              text: '接受改柜，先把饭拿到再说',
              effects: {
                clarity: -1,
                firmness: -1,
                evidence: 0,
                pressure: 0
              },
              next: {
                type: 'event',
                target: 'stage3-event2'
              },
              commentary:
                '你减少了当场交涉，但也默认了“随手放到最近处”可以算完成履约。'
            },
            {
              id: 'stage3-event1-choice2',
              text: '回复订单备注截图，要求按指定柜重新投放',
              effects: {
                clarity: 2,
                firmness: 2,
                evidence: 1,
                pressure: 1
              },
              next: {
                type: 'event',
                target: 'stage3-event2'
              },
              commentary:
                '你把问题重新拉回订单写明的要求。免费不代表可以随便放，备注也不是装饰。'
            },
            {
              id: 'stage3-event1-choice3',
              text: '询问原因并保留聊天记录，准备事后反馈学校和平台',
              effects: {
                clarity: 1,
                firmness: 1,
                evidence: 2,
                pressure: 2
              },
              next: {
                type: 'event',
                target: 'stage3-event2'
              },
              commentary:
                '你没有只争这一单，而是在判断“进不去”到底是客观限制，还是省一步路的惯性。'
            }
          ]
        },
        {
          id: 'stage3-event2',
          sceneType: 'locker_scene',
          kicker: '00:03 下大雨了',
          title: '雨夜里明明还有空柜，你的外卖却被甩在柜外',
          scene:
            '你赶到柜机旁时，餐盒躺在雨水边上，旁边几格空柜门还亮着。免费的存柜已经存在，但是否愿意多走一步，仍然取决于执行者当下的选择。',
          screen: {
            backgroundImage: './assets/locker-stage3.svg',
            overlay: {
              time: '00:03',
              weather: '暴雨',
              statusTag: '柜外淋雨',
              headline: '空柜还亮着',
              primaryStatus: '餐盒躺在柜外雨水边',
              secondaryStatus: '旁边仍有空柜可用',
              location: '校内 2 号柜旁'
            },
            evidenceHints: [
              '空柜门仍可见',
              '雨水边界明显',
              '柜外投放与订单备注可对照'
            ],
            actionLabel: '你要把这次雨夜送达怎么记下来？'
          },
          choices: [
            {
              id: 'stage3-event2-choice1',
              text: '拍照留证，立即走平台异常履约流程',
              effects: {
                clarity: 1,
                firmness: 1,
                evidence: 3,
                pressure: 2
              },
              next: {
                type: 'ending',
                target: 'computed'
              },
              commentary:
                '你把“明明有柜却没放”的事实固定下来，让这一单不再只剩一句“下雨嘛，理解一下”。'
            },
            {
              id: 'stage3-event2-choice2',
              text: '联系宿舍群收集类似经历，再一并反馈给学校',
              effects: {
                clarity: 1,
                firmness: 1,
                evidence: 2,
                pressure: 3
              },
              next: {
                type: 'ending',
                target: 'computed'
              },
              commentary:
                '你把单点遭遇整理成共性问题。个人维权开始向制度监督转变。'
            },
            {
              id: 'stage3-event2-choice3',
              text: '认命拿走，安慰自己“至少这次没丢”',
              effects: {
                clarity: 0,
                firmness: -1,
                evidence: 0,
                pressure: -1
              },
              next: {
                type: 'ending',
                target: 'computed'
              },
              commentary:
                '免费的制度已经到了，但执行层面的缺口还是会继续落回最愿意将就的人身上。'
            }
          ]
        }
      ]
    }
  ],
  endings: {
    'silent-swallow': {
      id: 'silent-swallow',
      title: '沉默吞下结局',
      badge: '沉默吞下',
      personalTitle: '沉默吞下结局',
      personalSummary:
        '你保住过几顿饭，也吞下过更多不必要的妥协。每次都像只是小麻烦，但久了以后，“用户应该被好好履约”这件事也一起变小了。',
      systemTitle: '旧秩序继续凑合运行',
      systemSummary:
        '规则没有真正回应问题，只是继续靠个人忍耐维持表面平静。成本没有消失，只是悄悄落在最愿意将就的人身上。'
    },
    'barely-held': {
      id: 'barely-held',
      title: '勉强保住但很累结局',
      badge: '勉强保住',
      personalTitle: '勉强保住但很累结局',
      personalSummary:
        '你靠备注、电话和临场应对一次次把这一单抢回来，但几乎每次都要自己补沟通、补解释、补情绪成本。',
      systemTitle: '免费之后仍靠个人消耗',
      systemSummary:
        '制度比以前前进了一点，但执行仍然摇摆。没有持续监督时，很多履约成本仍会回到用户自己身上。'
    },
    'meal-saved': {
      id: 'meal-saved',
      title: '本单保住结局',
      badge: '本单保住',
      personalTitle: '本单保住结局',
      personalSummary:
        '你很会写备注，也知道在关键时刻不退让，所以大多数时候都能把这一单守住。只是你也逐渐发现，这种稳定更多来自你自己，而不是系统本身。',
      systemTitle: '规则改善了，但还没有变成习惯',
      systemSummary:
        '“免费”解决了最显眼的收费矛盾，却没有自动带来稳定履约。好的结果依然需要用户亲自盯着。'
    },
    'rights-defended': {
      id: 'rights-defended',
      title: '维权成功结局',
      badge: '维权成功',
      personalTitle: '维权成功结局',
      personalSummary:
        '你没有把问题只当作一单倒霉事，而是把聊天、照片和订单记录拼成了完整证据。平台开始回应，你的这一单终于不再只是“算了”。',
      systemTitle: '制度修正开始发生',
      systemSummary:
        '当证据足够完整、反馈足够明确时，规则才会从纸面慢慢落到执行上。你推动的不是情绪发泄，而是具体改进。'
    },
    'system-corrected': {
      id: 'system-corrected',
      title: '制度修正结局',
      badge: '制度修正',
      personalTitle: '制度修正结局',
      personalSummary:
        '你既保住了自己的外卖，也持续把问题推向更高层面的处理。你不只是在为一顿饭交涉，而是在逼着规则承认：履约不该靠用户临场加钱、加耐心、加运气。',
      systemTitle: '制度修正结局',
      systemSummary:
        '调价、免费、加强反馈通道之后，存柜率提升了，但真正的变化来自持续监督。免费不是终点，执行才是。'
    }
  }
};

export const META = GAME_DATA.meta;
export const PROJECT_COPY = {
  title: META.title,
  shortTitle: META.shortTitle,
  subtitle: META.subtitle,
  oneLiner: META.oneLiner,
  tagline: META.tagline
};

export const STAT_DEFS = GAME_DATA.stats;
export const CHAPTERS = GAME_DATA.chapters;
export const ENDINGS = GAME_DATA.endings;
export const ENDING_LIST = Object.values(ENDINGS);

export const STAGES = CHAPTERS.map((chapter) => ({
  id: chapter.id,
  label: chapter.label,
  title: chapter.title,
  theme: chapter.subtitle,
  intro: chapter.intro,
  wrapUp: chapter.summary.body,
  events: chapter.events.map((event) => ({
    id: event.id,
    kicker: event.kicker,
    title: event.title,
    scene: event.scene,
    sceneType: event.sceneType,
    screen: event.screen,
    options: event.choices.map((choice) => ({
      id: choice.id,
      label: choice.text,
      aftermath: choice.commentary ?? '',
      effect: choice.effects
    }))
  }))
}));

export const STAGE_SCORECARDS = Object.fromEntries(
  CHAPTERS.map((chapter) => [chapter.id, chapter.summary.outcomes])
);
