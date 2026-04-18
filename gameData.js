export const PROJECT_COPY = {
  title: '深夜食堂外：请放柜，谢谢',
  shortTitle: '深夜食堂外',
  oneLiner: '一个关于校园外卖权益被层层谈判的互动策略游戏。',
  tagline:
    '你会在 7 毛、4 毛与免费后的三个制度阶段里，通过备注、沟通、留证和反馈，试着保住今晚的晚饭，也推动规则变化。'
};

export const STAT_DEFS = [
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
    description: '是否截图、拍照并保留对话与订单记录。'
  },
  {
    id: 'pressure',
    label: '反馈推进度',
    description: '你是否把问题推向平台、学校或更高层面的介入。'
  }
];

export const STAGES = [
  {
    id: 'stage-1',
    label: '第一幕',
    title: '7 毛时代',
    theme: '旧秩序下的隐性不公平',
    intro:
      '外卖柜收费 0.7 元。骑手大多不愿承担，但学校仍默许把餐放在寝室楼下台阶。矛盾存在，只是暂时被“还能凑合拿到餐”压住了。',
    wrapUp:
      '这一阶段的核心不是彻底失控，而是隐性不公平：谁更愿意多说两句、多追一下、多忍一点，谁就更可能保住这一单。',
    events: [
      {
        id: 'stage1-event1',
        kicker: '22:42 晚饭到了',
        title: '备注写了“请放南门 3 号柜”，骑手来电要打赏',
        scene:
          '骑手说：“柜子要钱的，你要是想放进去，就给我补个打赏。我也不能白搭这个钱吧。” 你知道楼下台阶也能放，但你今晚正赶作业，不想下楼找。',
        options: [
          {
            id: 'stage1-event1-choice1',
            label: '直接转 1 元，换这一单省事',
            aftermath: '你这一单大概率能进柜，但默认了“额外付费才配合备注”的规则。',
            effect: {
              clarity: 0,
              firmness: -1,
              evidence: 0,
              pressure: -1
            }
          },
          {
            id: 'stage1-event1-choice2',
            label: '先截图，再明确要求按备注放入指定柜',
            aftermath: '你把备注和对话截下来，语气克制但没有退让。',
            effect: {
              clarity: 2,
              firmness: 1,
              evidence: 2,
              pressure: 0
            }
          },
          {
            id: 'stage1-event1-choice3',
            label: '改口同意放楼下台阶，先把饭拿到手',
            aftermath: '你省掉了电话拉扯，但也把“指定柜”这一要求主动撤回了。',
            effect: {
              clarity: -1,
              firmness: -1,
              evidence: 0,
              pressure: 0
            }
          }
        ]
      },
      {
        id: 'stage1-event2',
        kicker: '23:05 订单完成',
        title: '平台弹出满意度评价，你要不要追究这一单？',
        scene:
          '这一单最后被放在楼下台阶边。平台页面出现“骑手服务如何”的评价入口，室友说：“算了，反正以前也都这样。”',
        options: [
          {
            id: 'stage1-event2-choice1',
            label: '点个一般，写一句“备注未执行”就算了',
            aftermath: '你留下了轻量反馈，但没有形成足够压力。',
            effect: {
              clarity: 0,
              firmness: 0,
              evidence: 1,
              pressure: 1
            }
          },
          {
            id: 'stage1-event2-choice2',
            label: '整理截图，正式投诉“索要打赏后才愿入柜”',
            aftermath: '你把问题从一次沟通摩擦，推向平台履约层面。',
            effect: {
              clarity: 1,
              firmness: 1,
              evidence: 2,
              pressure: 2
            }
          },
          {
            id: 'stage1-event2-choice3',
            label: '什么都不填，告诉自己“下次早点下楼”',
            aftermath: '问题没有消失，只是被你吞下去了。',
            effect: {
              clarity: -1,
              firmness: -1,
              evidence: -1,
              pressure: -1
            }
          }
        ]
      }
    ]
  },
  {
    id: 'stage-2',
    label: '第二幕',
    title: '4 毛时代',
    theme: '规则先变，成本没人愿意接',
    intro:
      '学校禁止骑手骑车进入宿舍区，也不再允许把餐大面积堆在楼下。外卖柜被鼓励使用，但仍要收费。规则变了，成本却悬在半空。',
    wrapUp:
      '这一阶段冲突最剧烈。不是因为规则本身一定错误，而是因为执行成本没有明确落地，最后被一层层转嫁回用户。',
    events: [
      {
        id: 'stage2-event1',
        kicker: '21:58 晚高峰',
        title: '骑手说：“我先帮你垫 4 毛，还是你直接打赏给我？”',
        scene:
          '宿舍区入口已经设卡，骑手停在外面打电话，语气比以前更硬：“现在不能进去，也不能乱放。柜子还收费，你自己看怎么弄。”',
        options: [
          {
            id: 'stage2-event1-choice1',
            label: '补 4 毛，让他先把这单塞进柜里',
            aftermath: '你把制度成本临时买单了，这一单可能更顺，但并没有解决后续问题。',
            effect: {
              clarity: 0,
              firmness: -1,
              evidence: 0,
              pressure: -1
            }
          },
          {
            id: 'stage2-event1-choice2',
            label: '重复备注与柜号，并说明你不会额外打赏',
            aftermath: '你把要求说得更清楚，也明确拒绝把履约义务改成私人议价。',
            effect: {
              clarity: 2,
              firmness: 2,
              evidence: 1,
              pressure: 0
            }
          },
          {
            id: 'stage2-event1-choice3',
            label: '保存通话记录，表示若落地将立刻投诉',
            aftermath: '你把注意力从“这单怎么办”转向“对方是否愿意承担后果”。',
            effect: {
              clarity: 1,
              firmness: 1,
              evidence: 2,
              pressure: 2
            }
          }
        ]
      },
      {
        id: 'stage2-event2',
        kicker: '22:10 现场一片狼藉',
        title: '你下楼后，发现外卖被直接扔在地上',
        scene:
          '你按电话里约定去了宿舍区口，却看到几袋外卖直接堆在地面警戒线旁。你的那份也在其中，备注和沟通像是从来没存在过。',
        options: [
          {
            id: 'stage2-event2-choice1',
            label: '先捡走自己的外卖，拍一张照存证',
            aftermath: '你保住了这一餐，也留下了最低限度证据。',
            effect: {
              clarity: 0,
              firmness: 0,
              evidence: 2,
              pressure: 1
            }
          },
          {
            id: 'stage2-event2-choice2',
            label: '现场拍照并提交平台投诉，强调“备注和沟通均被无视”',
            aftermath: '你把个人倒霉经历组织成了一条可处理的履约证据链。',
            effect: {
              clarity: 1,
              firmness: 1,
              evidence: 2,
              pressure: 3
            }
          },
          {
            id: 'stage2-event2-choice3',
            label: '在群里吐槽两句，外卖照吃',
            aftermath: '情绪得到了释放，但规则层面没有任何新增约束。',
            effect: {
              clarity: 0,
              firmness: -1,
              evidence: 0,
              pressure: 0
            }
          }
        ]
      }
    ]
  },
  {
    id: 'stage-3',
    label: '第三幕',
    title: '免费后的新常态',
    theme: '收费缓解了，执行问题仍在',
    intro:
      '在持续投诉与反馈后，入柜价格先降到 0.4 元，后来又被调为免费。存柜率明显提升，但“柜子免费”并不自动等于“服务到位”。',
    wrapUp:
      '当收费问题缓解后，冲突并没有自然消失。执行质量、履约意识和持续监督，决定了“规则改了”是否真的落到每一单上。',
    events: [
      {
        id: 'stage3-event1',
        kicker: '23:21 零点前最后一单',
        title: '骑手称“不能进校园”，把外卖放到校门口别的柜',
        scene:
          '你明明在订单里写了校内指定柜号，骑手却发来消息：“里面进不去，我给你放北门门口的柜了。” 你知道现在不少骑手会直接图近。',
        options: [
          {
            id: 'stage3-event1-choice1',
            label: '接受改柜，先把饭拿到再说',
            aftermath: '你少了当场拉扯，但默认了“随手放到最近处”也算完成履约。',
            effect: {
              clarity: -1,
              firmness: -1,
              evidence: 0,
              pressure: 0
            }
          },
          {
            id: 'stage3-event1-choice2',
            label: '回复订单备注截图，要求按指定柜重新投放',
            aftermath: '你把问题重新拉回“订单写了什么、应当做到什么”。',
            effect: {
              clarity: 2,
              firmness: 2,
              evidence: 1,
              pressure: 1
            }
          },
          {
            id: 'stage3-event1-choice3',
            label: '询问原因并保留聊天记录，准备事后反馈学校和平台',
            aftermath: '你没有把注意力只放在这一单，而是试图校验“进不去”到底是不是借口。',
            effect: {
              clarity: 1,
              firmness: 1,
              evidence: 2,
              pressure: 2
            }
          }
        ]
      },
      {
        id: 'stage3-event2',
        kicker: '00:03 下雨了',
        title: '雨夜里柜子没满，外卖却被甩在柜外',
        scene:
          '你赶到柜机旁时，发现你的餐盒躺在雨水边上，旁边几格空柜门还亮着。免费的存柜已经存在，但执行仍然取决于骑手愿不愿意多走一步。',
        options: [
          {
            id: 'stage3-event2-choice1',
            label: '拍照留证，立即走平台异常履约流程',
            aftermath: '你用最直接的方式把“明明有柜却没放”的事实固定下来。',
            effect: {
              clarity: 1,
              firmness: 1,
              evidence: 3,
              pressure: 2
            }
          },
          {
            id: 'stage3-event2-choice2',
            label: '联系宿舍群收集类似经历，一并反馈学校',
            aftermath: '你把单点遭遇变成了可被看见的共性问题。',
            effect: {
              clarity: 1,
              firmness: 1,
              evidence: 2,
              pressure: 3
            }
          },
          {
            id: 'stage3-event2-choice3',
            label: '认命拿走，安慰自己“至少这次没丢”',
            aftermath: '免费的制度已经到了，但执行层面的缺口还会继续留下来。',
            effect: {
              clarity: 0,
              firmness: -1,
              evidence: 0,
              pressure: -1
            }
          }
        ]
      }
    ]
  }
];

export const STAGE_SCORECARDS = {
  'stage-1': {
    low: '旧秩序继续靠“还能放楼下”凑合运行。你吃到了饭，但也几乎把备注权和要求权一起让掉了。',
    mid: '旧秩序表面还能维持，你至少让对方知道这不是一句“都这样”的小事，但改变还远没开始。',
    high: '旧秩序没有立刻改变，但你已经把“将就和平”背后的隐性不公平翻到了台面上。'
  },
  'stage-2': {
    low: '规则突变后，成本继续向下掉。你感受到的不是秩序，而是“谁更弱，谁来兜底”。',
    mid: '冲突升级了，但你开始把零散的不满整理成可处理的问题，规则的漏洞被你一点点指出来。',
    high: '在最混乱的阶段，你没有只顾着自救，而是持续留证与施压，让“成本到底该谁承担”成为无法回避的问题。'
  },
  'stage-3': {
    low: '免费并没有自动修复执行。制度看似前进了，但如果没人追问，很多餐还是会被随手扔回现实。',
    mid: '收费问题缓解后，你仍在用沟通和记录维护自己的权益，执行层面的缝隙开始被看见。',
    high: '免费后的新常态不再只是“能不能放柜”，而是“写明的要求能否被稳定执行”。你把监督推到了更制度化的位置。'
  }
};

export const ENDINGS = {
  'silent-swallow': {
    id: 'silent-swallow',
    badge: '沉默吞下',
    personalTitle: '沉默吞下结局',
    personalSummary:
      '你保住过几顿饭，也吞下过更多不必要的妥协。每次都像只是小麻烦，但久了以后，“用户应该被好好履约”这件事也一起变小了。',
    systemTitle: '旧秩序继续凑合运行',
    systemSummary:
      '规则没有真正回应问题，只是继续靠个人忍耐维持表面平静。成本没有消失，只是悄悄落在最愿意将就的人身上。 '
  },
  'barely-held': {
    id: 'barely-held',
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
    badge: '制度修正',
    personalTitle: '制度修正结局',
    personalSummary:
      '你既保住了自己的外卖，也持续把问题推向更高层面的处理。你不只是在为一顿饭交涉，而是在逼着规则承认：履约不该靠用户临场加钱、加耐心、加运气。',
    systemTitle: '制度修正结局',
    systemSummary:
      '调价、免费、加强反馈通道之后，存柜率提升了，但真正的变化来自持续监督。免费不是终点，执行才是。'
  }
};
