// 한 폭 — 작품·문장 데이터 (모든 그림은 퍼블릭 도메인)
const ART = [
  { id:'starry', t:'별이 빛나는 밤', te:'The Starry Night', a:'빈센트 반 고흐', as:'반 고흐', y:'1889', m:'뉴욕 현대미술관(MoMA)', pos:'30% 50%', g:'imp',
    s:{c:'위로', t:'살아 있는 동안 팔린 유화는 한 점뿐이었대요. 아무도 몰라줘도, 하는 일의 가치는 사라지지 않아요.', fact:true},
    story:['생레미의 요양원에 머물던 고흐가 1889년 6월, 동쪽 창으로 보이던 해 뜨기 전 하늘을 바탕으로 그렸어요.',
           '창밖에 없던 마을과 교회 첨탑은 기억과 상상으로 더했어요. 소용돌이치는 하늘은 지금 가장 많이 사랑받는 밤하늘이 되었어요.'] },
  { id:'cafe', t:'밤의 카페', te:'The Night Café', a:'빈센트 반 고흐', as:'반 고흐', y:'1888', m:'예일대학교 미술관', pos:'50% 50%', g:'imp',
    s:{c:'웃음', t:'밤샘은 명작을 남길 때만 하기로 해요. 오늘은 일찍 자요.'},
    story:['아를의 라마르틴 광장에 있던 밤샘 카페를 그렸어요. 고흐는 이 그림을 그리느라 사흘 밤을 새웠다고 동생 테오에게 편지를 썼어요.',
           '붉은 벽과 초록 천장을 부딪치게 해서 사람의 고단한 정념을 드러내려 했다고 해요.'] },
  { id:'olive', t:'올리브 나무들', te:'Olive Trees', a:'빈센트 반 고흐', as:'반 고흐', y:'1889', m:'올리브 숲 연작 중 한 점', pos:'45% 50%', g:'imp',
    s:{c:'용기', t:'같은 길을 매일 걸어도, 매일 조금씩 다른 빛을 만나요.'},
    story:['생레미 시절 고흐는 요양원 둘레의 올리브 숲을 열다섯 점 넘게 그렸어요.',
           '같은 나무를 계절과 시간을 바꿔 가며 거듭 그리면서, 매번 달라지는 빛을 붙잡으려 했어요.'] },
  { id:'vgself', t:'밀짚모자를 쓴 자화상', te:'Self-Portrait with a Straw Hat', a:'빈센트 반 고흐', as:'반 고흐', y:'1887', m:'파리 시기 자화상', pos:'50% 35%', g:'imp',
    s:{c:'용기', t:'화랑 직원, 교사, 서점 직원, 전도사. 빈센트는 스물일곱에야 붓을 들었어요. 길을 바꾸는 건 늦은 게 아니에요.', fact:true},
    story:['파리에서 지낸 2년 동안 고흐는 자화상을 스무 점 넘게 그렸어요. 모델을 부를 돈이 없어 거울 속 자신을 가장 가까운 모델로 삼았대요.',
           '짧은 붓질을 촘촘히 겹친 이 그림에는 인상주의를 배우던 시기의 흔적이 고스란히 남아 있어요.'] },
  { id:'wheat', t:'사이프러스가 있는 밀밭', te:'Wheat Field with Cypresses', a:'빈센트 반 고흐', as:'반 고흐', y:'1889', m:'같은 구도로 세 점이 남아 있어요', pos:'74% 50%', g:'imp',
    s:{c:'감사', t:'햇살과 바람이 밀을 익게 하듯, 오늘 나를 키운 작은 것들에게 고마워요.'},
    story:['1889년 여름, 생레미에서 그렸어요. 고흐는 같은 구도로 세 점을 남겼는데, 한 점은 들판에서, 두 점은 작업실에서 다시 그렸어요.',
           '고흐는 편지에서 사이프러스가 이집트의 오벨리스크처럼 아름답다고 적었어요.'] },
  { id:'lilies', t:'수련', te:'Water Lilies', a:'클로드 모네', as:'모네', y:'1916–1919', m:'지베르니 수련 연작', pos:'50% 50%', g:'imp',
    s:{c:'위로', t:'흐릿한 날에도 꽃은 피어요. 선명하지 않아도 괜찮아요.'},
    story:['모네는 지베르니 집 정원에 연못을 만들고, 말년의 30년 가까이 수련을 250점 가까이 그렸어요.',
           '백내장으로 눈이 흐려진 뒤에도 붓을 놓지 않았어요. 그래서 후기 수련일수록 색이 더 대담하고 흐드러져요.'] },
  { id:'wave', t:'가나가와 앞바다의 높은 파도', te:'The Great Wave off Kanagawa', a:'가쓰시카 호쿠사이', as:'호쿠사이', y:'1831년경', m:'「후가쿠 36경」 목판화', pos:'30% 50%', g:'east',
    s:{c:'용기', t:'파도가 커 보여도, 멀리서 보면 산은 그대로예요.'},
    story:['후지산을 서른여섯 곳에서 바라본 목판화 연작 「후가쿠 36경」 중 한 장이에요. 거대한 파도 아래 작게 보이는 산이 후지산이에요.',
           '당시 새로 들어온 안료 프러시안 블루의 선명한 파랑이 쓰였고, 같은 판으로 수천 장을 찍어 냈어요.'] },
  { id:'scream', t:'절규', te:'The Scream', a:'에드바르 뭉크', as:'뭉크', y:'1893', m:'노르웨이 국립미술관', pos:'48% 50%', g:'exp',
    s:{c:'위로', t:'소리치고 싶은 날도 있어요. 그 마음을 알아차린 것만으로도 잘하고 있어요.'},
    story:['해 질 녘 오슬로 피오르를 따라 걷다 하늘이 붉게 물들 때, 뭉크는 자연을 꿰뚫는 끝없는 비명을 느꼈다고 적었어요.',
           '그는 이 장면을 그림 두 점, 파스텔 두 점, 판화로 여러 번 다시 만들었어요.'] },
  { id:'shipwreck', t:'난파선', te:'The Shipwreck', a:'윌리엄 터너', as:'터너', y:'1805', m:'테이트 브리튼', pos:'45% 50%', g:'exp',
    s:{c:'용기', t:'폭풍 속에서도 노를 젓는 손이 있어요. 오늘의 내 손처럼요.'},
    story:['집채만 한 파도 속에서 작은 구조선들이 난파한 배의 사람들을 건지려 애쓰는 장면이에요.',
           '터너의 작품 가운데 처음으로 판화로 만들어져 널리 퍼진 그림이에요. 터너는 평생 바다와 빛을 그린 화가로 남았어요.'] },
  { id:'kandinsky', t:'구성 VII', te:'Composition VII', a:'바실리 칸딘스키', as:'칸딘스키', y:'1913', m:'트레티야코프 미술관', pos:'50% 50%', g:'abs',
    s:{c:'정보', t:'칸딘스키는 색에서 소리를 들었대요. 오늘 내 하루는 어떤 소리일까요?'},
    story:['칸딘스키가 1차 세계대전 전에 그린 작품 가운데 가장 복잡한 그림으로 꼽혀요.',
           '서른 점이 넘는 습작을 거친 뒤, 큰 캔버스는 단 나흘 만에 완성했어요. 그는 색과 형태가 음악처럼 울린다고 믿었어요.'] },
  { id:'matisse', t:'모자를 쓴 여인', te:'Woman with a Hat', a:'앙리 마티스', as:'마티스', y:'1905', m:'샌프란시스코 현대미술관', pos:'50% 40%', g:'exp',
    s:{c:'웃음', t:'얼굴이 초록빛이어도 명작이 돼요. 오늘 내 컨디션도 나름 예술이에요.'},
    story:['1905년 파리 살롱 도톤에 걸렸을 때, 거친 색을 본 비평가가 ‘야수들’이라는 말을 써서 ‘야수파’라는 이름이 생겼어요.',
           '그림 속 모델은 마티스의 아내 아멜리예요.'] },
  { id:'udnie', t:'우드니', te:'Udnie', a:'프랑시스 피카비아', as:'피카비아', y:'1913', m:'퐁피두 센터', pos:'50% 50%', g:'abs',
    s:{c:'웃음', t:'몸이 먼저 기억하는 리듬이 있어요. 오늘은 그 리듬대로 가 봐요.'},
    story:['뉴욕으로 가는 배 위에서 본 무용수의 춤을 기억해 그렸어요.',
           '사람의 모습 대신 리듬과 움직임만 남긴, 피카비아의 대표적인 추상화예요.'] },
  /*MORE-START*/
  { id:'met436524', t:'해바라기', te:'Sunflowers', a:'빈센트 반 고흐', as:'반 고흐', y:'1887', m:'메트로폴리탄 미술관', pos:'50% 50%', g:'imp', src:'https://www.metmuseum.org/art/collection/search/436524',
    s:{c:'웃음', t:'사람들이 \'반 고흐\'를 제대로 못 불러서, 그는 그림에 \'빈센트\'라고만 서명했어요. 오늘은 나를 내 이름으로 불러 줘요.', fact:true},
    story:['파리 시절인 1887년 여름, 꺾어 놓은 해바라기 두 송이를 바닥에 눕혀 그렸어요.', '아를에서 꽃병에 꽂힌 해바라기 연작을 그리기 전, 고흐가 해바라기라는 주제를 처음 붙잡은 그림 가운데 하나예요.'] },
  { id:'met436525', t:'꽃병의 꽃다발', te:'Bouquet of Flowers in a Vase', a:'빈센트 반 고흐', as:'반 고흐', y:'1890', m:'메트로폴리탄 미술관', pos:'50% 50%', g:'imp', src:'https://www.metmuseum.org/art/collection/search/436525',
    story:['고흐가 세상을 떠나기 몇 달 전, 프랑스 오베르쉬르우아즈에서 그린 것으로 알려진 꽃 정물이에요.', '들꽃과 정원 꽃을 한데 모은 꽃다발이 화면을 꽉 채우고 있어요.'] },
  { id:'met436526', t:'첫걸음 (밀레를 따라서)', te:'First Steps, after Millet', a:'빈센트 반 고흐', as:'반 고흐', y:'1890', m:'메트로폴리탄 미술관', pos:'50% 50%', g:'imp', src:'https://www.metmuseum.org/art/collection/search/436526',
    s:{c:'정보', t:'빈센트는 존경하던 밀레를 "스승"처럼 여기며 그의 그림을 여러 번 따라 그렸어요. 좋아하는 걸 따라 해 보는 것도 훌륭한 연습이에요.', fact:true},
    story:['생레미 요양원에 있던 고흐는 존경하던 화가 밀레의 그림을 사진으로 받아 자기 색으로 다시 그렸어요.', '아빠를 향해 첫걸음을 떼는 아기와 등을 받쳐 주는 엄마, 일상의 작은 순간을 담았어요.'] },
  { id:'met436527', t:'꽃 핀 과수원', te:'The Flowering Orchard', a:'빈센트 반 고흐', as:'반 고흐', y:'1888', m:'메트로폴리탄 미술관', pos:'50% 50%', g:'imp', src:'https://www.metmuseum.org/art/collection/search/436527',
    s:{c:'위로', t:'봄 햇살을 찾아 아를에 도착한 날, 그곳엔 눈이 쌓여 있었대요. 기대와 다른 시작이어도 꽃은 피어요.', fact:true},
    story:['1888년 봄 아를에 도착한 고흐는 막 꽃이 핀 과수원에 반해, 한 달 남짓 동안 과수원 그림을 열 점 넘게 그렸어요.', '꽃이 지기 전에 다 그리려고 서둘렀대요. 봄은 짧으니까요.'] },
  { id:'met436528', t:'붓꽃', te:'Irises', a:'빈센트 반 고흐', as:'반 고흐', y:'1890', m:'메트로폴리탄 미술관', pos:'50% 50%', g:'imp', src:'https://www.metmuseum.org/art/collection/search/436528',
    s:{c:'정보', t:'어린 빈센트는 곤충 이름을 다 외울 만큼 들여다보는 걸 좋아했대요. 오늘은 작은 것 하나를 오래 바라봐요.', fact:true},
    story:['1890년 5월, 생레미 요양원을 떠나기 직전에 그린 붓꽃 정물이에요.', '배경은 원래 분홍색이었는데, 세월이 지나며 안료가 바래 지금처럼 하얗게 보여요.'] },
  { id:'met436529', t:'아를의 여인: 지누 부인', te:'L\'Arlésienne: Madame Joseph-Michel Ginoux (Marie Julien, 1848–1911)', a:'빈센트 반 고흐', as:'반 고흐', y:'1888–89', m:'메트로폴리탄 미술관', pos:'50% 50%', g:'imp', src:'https://www.metmuseum.org/art/collection/search/436529',
    s:{c:'감사', t:'빈센트를 세상에 알린 건 테오의 아내 요한나였어요. 누군가의 진가를 알아봐 주는 사람도 위대해요.', fact:true},
    story:['아를의 카페 주인 지누 부인을 그린 초상이에요. 고흐는 이 인물을 한 시간 만에 그려 냈다고 편지에 적었어요.', '책을 앞에 두고 턱을 괸 모습에서 조용한 생각의 시간이 느껴져요.'] },
  { id:'met436530', t:'협죽도', te:'Oleanders', a:'빈센트 반 고흐', as:'반 고흐', y:'1888', m:'메트로폴리탄 미술관', pos:'50% 50%', g:'imp', src:'https://www.metmuseum.org/art/collection/search/436530',
    story:['1888년 여름 아를에서 그린 협죽도 꽃병이에요.', '탁자 위 노란 책은 에밀 졸라의 소설 『삶의 기쁨』이에요. 활짝 핀 꽃과 함께 삶을 긍정하는 마음을 담았다고 해요.'] },
  { id:'met436531', t:'난롯가에서 요리하는 농부 아낙', te:'Peasant Woman Cooking by a Fireplace', a:'빈센트 반 고흐', as:'반 고흐', y:'1885', m:'메트로폴리탄 미술관', pos:'50% 50%', g:'imp', src:'https://www.metmuseum.org/art/collection/search/436531',
    story:['네덜란드 누에넌에서 농부들의 삶을 그리던 시기의 그림이에요.', '어두운 갈색 톤은 이 무렵 고흐의 특징이에요. 몇 년 뒤 프랑스에 가면서 그의 색은 완전히 달라져요.'] },
  { id:'met436533', t:'신발', te:'Shoes', a:'빈센트 반 고흐', as:'반 고흐', y:'1888', m:'메트로폴리탄 미술관', pos:'50% 50%', g:'imp', src:'https://www.metmuseum.org/art/collection/search/436533',
    story:['고흐는 낡은 신발을 여러 번 그렸어요. 이 그림은 1888년 아를에서 그린 것이에요.', '닳고 해진 신발 한 켤레가 그것을 신고 걸었던 사람의 하루를 대신 이야기해 줘요.'] },
  { id:'met436534', t:'장미', te:'Roses', a:'빈센트 반 고흐', as:'반 고흐', y:'1890', m:'메트로폴리탄 미술관', pos:'50% 50%', g:'imp', src:'https://www.metmuseum.org/art/collection/search/436534',
    s:{c:'감사', t:'조카가 태어났다는 소식에 빈센트는 꽃 피는 나무 그림을 선물했어요. 누군가의 새 시작을 축하하는 마음은 오래 남아요.', fact:true},
    story:['생레미를 떠나기 직전인 1890년 봄에 그린 장미 정물이에요.', '처음엔 분홍빛 장미였지만 안료가 바래 지금은 하얀 장미처럼 보여요. 같은 시기에 그린 「붓꽃」과 짝을 이뤄요.'] },
  { id:'met436536', t:'올리브를 따는 여인들', te:'Women Picking Olives', a:'빈센트 반 고흐', as:'반 고흐', y:'1889', m:'메트로폴리탄 미술관', pos:'50% 50%', g:'imp', src:'https://www.metmuseum.org/art/collection/search/436536',
    story:['1889년 겨울 생레미에서 올리브를 수확하는 여인들을 그렸어요.', '고흐는 이 구도로 여러 점을 남겼어요. 그중 한 점은 어머니와 누이에게 주려고 다시 그렸어요.'] },
  { id:'met437980', t:'사이프러스', te:'Cypresses', a:'빈센트 반 고흐', as:'반 고흐', y:'1889', m:'메트로폴리탄 미술관', pos:'50% 50%', g:'imp', src:'https://www.metmuseum.org/art/collection/search/437980',
    story:['1889년 6월 생레미에서 그린 사이프러스예요. 하늘로 치솟는 나무가 불꽃처럼 일렁여요.', '물감을 두껍게 올린 붓 자국이 그대로 살아 있어서, 가까이서 보면 나무가 꿈틀거리는 것 같아요.'] },
  { id:'met437984', t:'자장가 (요람을 흔드는 여인)', te:'La Berceuse (Woman Rocking a Cradle; Augustine-Alix Pellicot Roulin, 1851–1930)', a:'빈센트 반 고흐', as:'반 고흐', y:'1889', m:'메트로폴리탄 미술관', pos:'50% 50%', g:'imp', src:'https://www.metmuseum.org/art/collection/search/437984',
    story:['우체부 룰랭의 아내 오귀스틴이 요람 끈을 쥐고 앉아 있는 모습이에요. 고흐는 이 그림을 다섯 번 그렸어요.', '거친 바다의 뱃사람들이 선실에서 이 그림을 보며 자장가 같은 위안을 얻기를 바랐대요.'] },
  { id:'met459123', t:'룰랭 부인과 아기', te:'Madame Roulin and Her Baby', a:'빈센트 반 고흐', as:'반 고흐', y:'1888', m:'메트로폴리탄 미술관', pos:'50% 50%', g:'imp', src:'https://www.metmuseum.org/art/collection/search/459123',
    s:{c:'감사', t:'빈센트와 테오는 18년 동안 편지를 600통 넘게 주고받았어요. 오늘 떠오르는 사람에게 짧은 안부를 보내 봐요.', fact:true},
    story:['아를에서 친하게 지낸 룰랭 가족의 엄마와 막내딸 마르셀을 그렸어요.', '고흐는 룰랭 가족 한 사람 한 사람을 모두 그렸어요. 그에게는 가족처럼 따뜻한 이웃이었어요.'] },
  { id:'met438722', t:'감자 깎는 여인', te:'The Potato Peeler (reverse: Self-Portrait with a Straw Hat)', a:'빈센트 반 고흐', as:'반 고흐', y:'1885', m:'메트로폴리탄 미술관', pos:'50% 50%', g:'imp', src:'https://www.metmuseum.org/art/collection/search/438722',
    s:{c:'용기', t:'캔버스 살 돈이 모자라면 쓰던 그림의 뒷면에 또 그렸어요. 다시 쓰는 것도 새로 시작하는 방법이에요.', fact:true},
    story:['누에넌 시절 감자를 깎는 농부 아낙을 그린 그림이에요.', '이 캔버스 뒷면에는 2년 뒤 파리에서 그린 「밀짚모자를 쓴 자화상」이 있어요. 캔버스 살 돈이 넉넉지 않아 뒷면을 다시 쓴 거예요.'] },
  { id:'met36490', t:'개풍쾌청 (붉은 후지)', te:'South Wind, Clear Sky (Gaifū kaisei), also known as Red Fuji, from the series Thirty-six Views of Mount Fuji (Fugaku sanjūrokkei)', a:'가쓰시카 호쿠사이', as:'호쿠사이', y:'1830–32년경', m:'메트로폴리탄 미술관', pos:'50% 50%', g:'east', src:'https://www.metmuseum.org/art/collection/search/36490',
    story:['「후가쿠 36경」 가운데 「가나가와 앞바다의 높은 파도」와 함께 가장 유명한 한 장이에요.', '늦여름에서 초가을 맑은 아침, 햇빛을 받아 붉게 물든 후지산을 단 몇 가지 색으로 표현했어요.'] },
  { id:'met36492', t:'산 아래 소나기', te:'Storm below Mount Fuji (Sanka no haku u), from the series Thirty-six Views of Mount Fuji (Fugaku sanjūrokkei)', a:'가쓰시카 호쿠사이', as:'호쿠사이', y:'1830–32년경', m:'메트로폴리탄 미술관', pos:'50% 50%', g:'east', src:'https://www.metmuseum.org/art/collection/search/36492',
    story:['「붉은 후지」와 같은 구도지만, 이번에는 산 아래로 번개가 내리치고 있어요.', '꼭대기는 맑고 아래는 폭풍인 후지산, 같은 산도 높이마다 다른 날씨를 품고 있어요.'] },
  { id:'met36493', t:'슨슈 에지리', te:'Ejiri in Suruga Province (Sunshū Ejiri), from the series Thirty-six Views of Mount Fuji (Fugaku sanjūrokkei)', a:'가쓰시카 호쿠사이', as:'호쿠사이', y:'1830–32년경', m:'메트로폴리탄 미술관', pos:'50% 50%', g:'east', src:'https://www.metmuseum.org/art/collection/search/36493',
    story:['갑자기 분 바람에 나그네들의 모자와 종이가 하늘로 날아가는 순간이에요.', '눈에 보이지 않는 바람을 휘어진 나무와 흩날리는 종이로 그려 냈어요. 멀리 후지산은 선 하나로만 남아 있어요.'] },
  { id:'met36495', t:'고슈 미사카 호수에 비친 후지', te:'Reflection in Lake at Misaka in Kai Province (Kōshū Misaka suimen), from the series Thirty-six Views of Mount Fuji (Fugaku sanjūrokkei)', a:'가쓰시카 호쿠사이', as:'호쿠사이', y:'1830–32년경', m:'메트로폴리탄 미술관', pos:'50% 50%', g:'east', src:'https://www.metmuseum.org/art/collection/search/36495',
    story:['미사카 고개에서 바라본 후지산과 호수에 비친 모습을 담았어요.', '호수 속 후지산은 실제 각도와 맞지 않고 눈까지 덮여 있어요. 호쿠사이가 일부러 넣은 작은 장난이라는 해석이 있어요.'] },
  { id:'met39656', t:'고슈 가지카자와', te:'Kajikazawa in Kai Province (Kōshū Kajikazawa), from the series Thirty-six Views of Mount Fuji (Fugaku sanjūrokkei)', a:'가쓰시카 호쿠사이', as:'호쿠사이', y:'1830–32년경', m:'메트로폴리탄 미술관', pos:'50% 50%', g:'east', src:'https://www.metmuseum.org/art/collection/search/39656',
    story:['거센 물살 위로 튀어나온 바위에서 어부가 그물을 던지고 있어요.', '어부와 파도의 선이 삼각형을 이루고, 그 끝에 후지산이 있어요. 화면 구성이 아주 단단한 그림이에요.'] },
  { id:'met39798', t:'신슈 스와호', te:'Lake Suwa in Shinano Province (Shinshū Suwako), from the series Thirty-six Views of Mount Fuji (Fugaku sanjūrokkei)', a:'가쓰시카 호쿠사이', as:'호쿠사이', y:'1830–32년경', m:'메트로폴리탄 미술관', pos:'50% 50%', g:'east', src:'https://www.metmuseum.org/art/collection/search/39798',
    story:['잔잔한 스와호 너머로 후지산이 보이는 고요한 풍경이에요.', '호수 가운데 작은 섬과 사당, 소나무가 조용히 균형을 잡고 있어요.'] },
  { id:'met55289', t:'후카가와 만넨교 아래', te:'Under the Mannen Bridge at Fukagawa (Fukagawa Mannenbashi shita), from the series Thirty-six Views of Mount Fuji (Fugaku sanjūrokkei)', a:'가쓰시카 호쿠사이', as:'호쿠사이', y:'1830–32년경', m:'메트로폴리탄 미술관', pos:'50% 50%', g:'east', src:'https://www.metmuseum.org/art/collection/search/55289',
    story:['에도 후카가와의 만넨교 아래로 후지산이 보이는 장면이에요.', '커다란 다리의 둥근 아치 안에 작은 후지산을 넣었어요. 큰 것과 작은 것을 한 화면에 겹치는 게 호쿠사이의 특기예요.'] },
  { id:'met37321', t:'고햐쿠라칸지 사자이도', te:'Sazai Hall at the Temple of the Five Hundred Arhats (Gohyaku Rakanji Sazaidō), from the series Thirty-six Views of Mount Fuji (Fugaku sanjūrokkei)', a:'가쓰시카 호쿠사이', as:'호쿠사이', y:'1830–32년경', m:'메트로폴리탄 미술관', pos:'50% 50%', g:'east', src:'https://www.metmuseum.org/art/collection/search/37321',
    story:['에도의 절 고햐쿠라칸지의 높은 누각에서 사람들이 멀리 후지산을 바라보고 있어요.', '한 사람이 손으로 가리키는 쪽을 따라가면 우리 눈도 자연스럽게 후지산에 닿아요.'] },
  { id:'met55237', t:'에도 니혼바시', te:'Nihonbashi in Edo (Edo Nihonbashi), from the series Thirty-six Views of Mount Fuji (Fugaku sanjūrokkei)', a:'가쓰시카 호쿠사이', as:'호쿠사이', y:'1830–32년경', m:'메트로폴리탄 미술관', pos:'50% 50%', g:'east', src:'https://www.metmuseum.org/art/collection/search/55237',
    story:['니혼바시는 에도에서 전국으로 뻗은 길이 시작되는 다리였어요.', '복잡한 다리 위 대신 강을 따라 늘어선 창고를 그리고, 그 끝에 작은 후지산과 에도성을 두었어요.'] },
  { id:'met36508', t:'조슈 우시보리', te:'Ushibori in Hitachi Province (Jōshū Ushibori), from the series Thirty-six Views of Mount Fuji (Fugaku sanjūrokkei)', a:'가쓰시카 호쿠사이', as:'호쿠사이', y:'1830–32년경', m:'메트로폴리탄 미술관', pos:'50% 50%', g:'east', src:'https://www.metmuseum.org/art/collection/search/36508',
    story:['우시보리의 물가, 배 위에서 누군가 물을 쏟자 백로들이 놀라 날아올라요.', '연작 가운데 드물게 겨울 눈 덮인 풍경이에요. 조용한 새벽 공기가 느껴져요.'] },
  { id:'met36499', t:'고슈 미시마 고개', te:'Mishima Pass in Kai Province (Kōshū Mishima goe), from the series Thirty-six Views of Mount Fuji (Fugaku sanjūrokkei)', a:'가쓰시카 호쿠사이', as:'호쿠사이', y:'1830–32년경', m:'메트로폴리탄 미술관', pos:'50% 50%', g:'east', src:'https://www.metmuseum.org/art/collection/search/36499',
    story:['미시마 고개의 거대한 삼나무를 나그네 셋이 팔을 벌려 재고 있어요.', '사람 셋이 둘러야 할 만큼 굵은 나무 옆에서, 멀리 후지산은 오히려 작아 보여요.'] },
  { id:'met55369', t:'도카이도 호도가야', te:'Hodogaya on the Tōkaidō (Tōkaidō Hodogaya), from the series Thirty-six Views of Mount Fuji (Fugaku sanjūrokkei)', a:'가쓰시카 호쿠사이', as:'호쿠사이', y:'1830–32년경', m:'메트로폴리탄 미술관', pos:'50% 50%', g:'east', src:'https://www.metmuseum.org/art/collection/search/55369',
    story:['도카이도의 호도가야 길, 소나무 줄기 사이로 후지산이 보여요.', '말을 탄 사람, 가마꾼, 짐꾼이 저마다 길을 가요. 나무 사이 틈으로 보는 풍경이 마치 창문 같아요.'] },
  { id:'met36489', t:'스오국 긴타이교', te:'Kintai Bridge in Suō Province (Suō no kuni Kintaibashi), from the series Remarkable Views of Bridges in Various Provinces (Shokoku meikyō kiran)', a:'가쓰시카 호쿠사이', as:'호쿠사이', y:'1827–30', m:'메트로폴리탄 미술관', pos:'50% 50%', g:'east', src:'https://www.metmuseum.org/art/collection/search/36489',
    story:['전국의 이름난 다리를 그린 연작 「제국 명교 기람」 중 한 장이에요.', '이와쿠니의 긴타이교는 나무로 된 다섯 개의 아치가 이어진 다리예요. 지금도 그 자리에 있어요.'] },
  { id:'met45026', t:'미카와 야쓰하시의 옛 모습', te:'Ancient View of Yatsuhashi in Mikawa Province (Mikawa no Yatsuhashi no kozu), from the series Remarkable Views of Bridges in Various Provinces (Shokoku meikyō kiran)', a:'가쓰시카 호쿠사이', as:'호쿠사이', y:'1834년경', m:'메트로폴리탄 미술관', pos:'50% 50%', g:'east', src:'https://www.metmuseum.org/art/collection/search/45026',
    story:['같은 다리 연작 중 한 장으로, 옛 이야기 『이세 이야기』에 나오는 야쓰하시를 상상해 그렸어요.', '야쓰하시는 붓꽃이 피는 늪에 놓인 지그재그 다리예요. 실제 풍경보다 이야기 속 장소를 그린 그림이에요.'] },
  { id:'met55022', t:'기소지 깊은 곳의 아미다 폭포', te:'The Amida Falls in the Far Reaches of the Kisokaidō Road (Kisoji no oku Amida-ga-taki), from the series A Tour of Waterfalls in Various Provinces (Shokoku taki meguri)', a:'가쓰시카 호쿠사이', as:'호쿠사이', y:'1827년경', m:'메트로폴리탄 미술관', pos:'50% 50%', g:'east', src:'https://www.metmuseum.org/art/collection/search/55022',
    story:['전국의 폭포를 그린 연작 「제국 폭포 순례」 중 한 장이에요.', '둥글게 파인 폭포 꼭대기가 아미타불의 후광을 닮았다고 해서 이런 이름이 붙었어요.'] },
  { id:'met55019', t:'구로카미산 기리후리 폭포', te:'Kirifuri Waterfall at Kurokami Mountain in Shimotsuke (Shimotsuke Kurokamiyama Kirifuri no taki), from the series A Tour of Waterfalls in Various Provinces (Shokoku taki meguri)', a:'가쓰시카 호쿠사이', as:'호쿠사이', y:'1832년경', m:'메트로폴리탄 미술관', pos:'50% 50%', g:'east', src:'https://www.metmuseum.org/art/collection/search/55019',
    story:['같은 폭포 연작 중 한 장으로, 물줄기가 나무뿌리처럼 여러 갈래로 갈라져 떨어져요.', '폭포 앞에서 올려다보는 순례자들이 아주 작게 그려져 있어 물줄기가 더 커 보여요.'] },
  { id:'met45027', t:'요시쓰네가 말을 씻은 요시노 폭포', te:'The Waterfall Where Yoshitsune Washed His Horse at Yoshino in Yamato Province (Washū Yoshino Yoshitsune uma arai no taki), from the series A Tour of Waterfalls in Various Provinces (Shokoku taki meguri)', a:'가쓰시카 호쿠사이', as:'호쿠사이', y:'1832년경', m:'메트로폴리탄 미술관', pos:'50% 50%', g:'east', src:'https://www.metmuseum.org/art/collection/search/45027',
    story:['영웅 미나모토노 요시쓰네가 말을 씻겼다는 전설이 전하는 요시노의 폭포예요.', '폭포 연작 여덟 장 중 하나예요. 호쿠사이는 물이 떨어지는 모양을 폭포마다 전혀 다르게 그렸어요.'] },
  { id:'met37192', t:'붓꽃과 메뚜기', te:'Grasshopper and Iris', a:'가쓰시카 호쿠사이', as:'호쿠사이', y:'1820년대 후반', m:'메트로폴리탄 미술관', pos:'50% 50%', g:'east', src:'https://www.metmuseum.org/art/collection/search/37192',
    story:['꽃과 곤충을 크게 클로즈업한 호쿠사이의 화조 판화예요.', '바람에 휜 붓꽃 잎 사이로 메뚜기 한 마리가 숨어 있어요. 찾으면 괜히 반가워요.'] },
  { id:'met54306', t:'도라지꽃과 잠자리', te:'Dragonfly and Bellflower', a:'가쓰시카 호쿠사이', as:'호쿠사이', y:'1820년대 후반', m:'메트로폴리탄 미술관', pos:'50% 50%', g:'east', src:'https://www.metmuseum.org/art/collection/search/54306',
    story:['화조 판화 연작 중 한 장으로, 보랏빛 도라지꽃 위를 잠자리가 날고 있어요.', '풍경화로 유명한 호쿠사이는 이렇게 작은 생명도 섬세하게 관찰해 그렸어요.'] },
  { id:'met437852', t:'솔태시의 나룻배, 콘월', te:'Saltash with the Water Ferry, Cornwall', a:'윌리엄 터너', as:'터너', y:'1811', m:'메트로폴리탄 미술관', pos:'50% 50%', g:'exp', src:'https://www.metmuseum.org/art/collection/search/437852',
    story:['영국 콘월의 타마르강, 솔태시 마을의 나룻배 선착장을 그렸어요.', '강가에 모인 사람들과 가축, 잔잔한 물빛이 한가로운 오후를 만들어요.'] },
  { id:'met437853', t:'살루테 성당 현관에서 본 베네치아', te:'Venice, from the Porch of Madonna della Salute', a:'윌리엄 터너', as:'터너', y:'1835년경', m:'메트로폴리탄 미술관', pos:'50% 50%', g:'exp', src:'https://www.metmuseum.org/art/collection/search/437853',
    story:['1835년 영국 왕립 아카데미에 걸린 베네치아 풍경이에요.', '터너는 평생 베네치아를 세 번 찾았어요. 물과 하늘과 건물이 빛 속에서 하나로 녹아드는 이 도시를 특히 사랑했어요.'] },
  { id:'met437854', t:'고래잡이들', te:'Whalers', a:'윌리엄 터너', as:'터너', y:'1845년경', m:'메트로폴리탄 미술관', pos:'50% 50%', g:'exp', src:'https://www.metmuseum.org/art/collection/search/437854',
    story:['터너가 말년에 고래잡이를 주제로 그린 네 점 가운데 하나예요.', '배와 고래와 물보라가 증기 같은 빛 속에 섞여, 무엇이 무엇인지 경계가 흐려져 있어요.'] },
  { id:'wmmon4e12b1', t:'양산을 쓴 여인', te:'Woman with a Parasol', a:'클로드 모네', as:'모네', y:'1875', m:'워싱턴 내셔널 갤러리', pos:'50% 50%', g:'imp', src:'https://commons.wikimedia.org/wiki/File:Claude_Monet_-_Woman_with_a_Parasol_-_Madame_Monet_and_Her_Son_-_Google_Art_Project.jpg',
    story:['아르장퇴유의 언덕에서 아내 카미유와 아들 장을 올려다보며 그렸어요.', '바람에 날리는 베일과 풀잎, 구름까지 짧은 붓질로 순간을 붙잡았어요. 정말 바람이 부는 것 같아요.'] },
  { id:'wmmon3100be', t:'생라자르 역: 기차의 도착', te:'The Gare Saint-Lazare: Arrival of a Train', a:'클로드 모네', as:'모네', y:'1877', m:'하버드 포그 미술관', pos:'50% 50%', g:'imp', src:'https://commons.wikimedia.org/wiki/File:Claude_Monet_-_The_Gare_Saint-Lazare;_Arrival_of_a_Train_-_1877.jpg',
    story:['모네는 파리 생라자르 역의 허락을 받고 역 안에서 열두 점 가까운 연작을 그렸어요.', '기차가 뿜는 증기와 유리 지붕으로 들어오는 빛, 근대 도시의 공기를 그림으로 남겼어요.'] },
  { id:'wmmon1674ba', t:'국회의사당, 햇빛 효과', te:'Houses of Parliament, Sunlight Effect', a:'클로드 모네', as:'모네', y:'1903', m:'브루클린 미술관', pos:'50% 50%', g:'imp', src:'https://commons.wikimedia.org/wiki/File:Claude_Monet_-_Houses_of_Parliament,_Sunlight_Effect_(Le_Parlement,_effet_de_soleil)_-_Google_Art_Project.jpg',
    story:['모네는 런던 템스강 건너편 병원 테라스에서 국회의사당을 수십 번 그렸어요.', '안개 속에서 해가 비칠 때마다 건물의 색이 달라졌어요. 그는 런던의 안개를 가장 사랑했다고 말했어요.'] },
  { id:'wmmonfb9f17', t:'루앙 대성당, 서쪽 정면의 햇빛', te:'Rouen Cathedral, West Façade, Sunlight', a:'클로드 모네', as:'모네', y:'1894', m:'워싱턴 내셔널 갤러리', pos:'50% 50%', g:'imp', src:'https://commons.wikimedia.org/wiki/File:Claude_Monet_-_Rouen_Cathedral,_West_Façade,_Sunlight_-_Google_Art_Project.jpg',
    story:['모네는 루앙 대성당 맞은편에 방을 빌려, 시간과 날씨를 바꿔 가며 대성당을 30점 넘게 그렸어요.', '같은 건물이 아침과 한낮, 해 질 녘에 전혀 다른 색이 돼요. 그가 그린 건 성당보다 빛이었어요.'] },
  { id:'wmmonfd436e', t:'건초더미 (눈과 해의 효과)', te:'Haystacks (Effect of Snow and Sun)', a:'클로드 모네', as:'모네', y:'1891', m:'메트로폴리탄 미술관', pos:'50% 50%', g:'imp', src:'https://commons.wikimedia.org/wiki/File:Claude_Monet_(French,_Paris_1840–1926_Giverny)_-_Haystacks_(Effect_of_Snow_and_Sun)_-_Google_Art_Project.jpg',
    story:['지베르니 집 근처 들판의 건초더미를 계절과 시간을 바꿔 가며 25점 넘게 그렸어요.', '눈 덮인 들판 위로 낮은 겨울 해가 비쳐요. 그림자에도 파랑과 분홍이 섞여 있어요.'] },
  { id:'wmmone5f19b', t:'엡트 강가의 포플러', te:'Poplars on the Epte', a:'클로드 모네', as:'모네', y:'1891', m:'테이트', pos:'50% 50%', g:'imp', src:'https://commons.wikimedia.org/wiki/File:Claude_Monet_-_Poplars_on_the_Epte_-_Google_Art_Project.jpg',
    story:['엡트 강가의 포플러 나무들이 베어질 위기에 처하자, 모네는 다 그릴 때까지 나무를 사 두었대요.', '나무줄기가 만드는 세로줄과 물에 비친 그림자가 리듬처럼 반복돼요.'] },
  { id:'wmmon19aa12', t:'일본식 다리', te:'The Japanese Footbridge', a:'클로드 모네', as:'모네', y:'1920–22', m:'뉴욕 현대미술관', pos:'50% 50%', g:'imp', src:'https://commons.wikimedia.org/wiki/File:Claude_Monet_-_The_Japanese_Footbridge,_Giverny_-_Google_Art_Project.jpg',
    story:['지베르니 연못 위 일본식 다리를 말년에 다시 그린 그림이에요.', '눈이 흐려진 시기라 형태는 거의 사라지고 붉고 노란 색의 덩어리만 남았어요. 추상화에 가까운 모네예요.'] },
  { id:'wmmon30d1e3', t:'까치', te:'The Magpie', a:'클로드 모네', as:'모네', y:'1868–69', m:'오르세 미술관', pos:'50% 50%', g:'imp', src:'https://commons.wikimedia.org/wiki/File:Claude_Monet_-_The_Magpie_-_Google_Art_Project.jpg',
    story:['노르망디 에트르타 근처의 눈 내린 아침, 울타리 위에 까치 한 마리가 앉아 있어요.', '1869년 살롱전에서 떨어졌던 그림이에요. 지금은 눈 그림자의 푸른빛을 보여 주는 대표작이 됐어요.'] },
  { id:'wmmond0be2b', t:'지베르니 근처 움푹한 양귀비 들판', te:'Poppy Field in a Hollow near Giverny', a:'클로드 모네', as:'모네', y:'1885', m:'보스턴 미술관', pos:'50% 50%', g:'imp', src:'https://commons.wikimedia.org/wiki/File:Claude_Monet_-_Poppy_Field_in_a_Hollow_near_Giverny_-_Google_Art_Project.jpg',
    story:['지베르니로 이사한 뒤, 집 근처 들판에 핀 양귀비를 그렸어요.', '움푹한 들판을 붉은 꽃이 가득 채웠어요. 모네는 이 마을 풍경을 평생 그렸어요.'] },
  { id:'wmmon882481', t:'생타드레스 해변', te:'The Beach at Sainte-Adresse', a:'클로드 모네', as:'모네', y:'1867', m:'시카고 미술관', pos:'50% 50%', g:'imp', src:'https://commons.wikimedia.org/wiki/File:Claude_Monet_-_The_Beach_at_Sainte-Adresse_-_Google_Art_Project.jpg',
    story:['노르망디 르아브르 근처 생타드레스는 모네 가족이 여름을 보내던 바닷가예요.', '모래 위에 끌어올린 배와 바다 위 돛단배들, 젊은 모네의 밝은 여름이 담겨 있어요.'] },
  { id:'wmmon7e6f48', t:'아르장퇴유의 요트 경주', te:'Regattas at Argenteuil', a:'클로드 모네', as:'모네', y:'1872', m:'오르세 미술관', pos:'50% 50%', g:'imp', src:'https://commons.wikimedia.org/wiki/File:Claude_Monet_-_Regattas_at_Argenteuil_-_Google_Art_Project.jpg',
    story:['파리 근교 아르장퇴유의 센강에서 열린 요트 경주예요.', '물에 비친 돛과 집들을 굵은 붓질 몇 번으로 툭툭 찍었어요. 가까이서 보면 색 조각, 멀리서 보면 반짝이는 물이에요.'] },
  { id:'wmmon08136a', t:'카퓌신 대로', te:'Boulevard des Capucines', a:'클로드 모네', as:'모네', y:'1873–74', m:'넬슨-앳킨스 미술관', pos:'50% 50%', g:'imp', src:'https://commons.wikimedia.org/wiki/File:Claude_Monet_-_Boulevard_des_Capucines_-_Google_Art_Project.jpg',
    story:['파리 카퓌신 대로의 사진가 나다르 작업실에서 내려다본 풍경이에요. 1874년 첫 인상파 전시가 바로 이 건물에서 열렸어요.', '길을 걷는 사람들을 점처럼 찍었어요. 당시 비평가들은 이걸 보고 혀를 찼지만, 지금은 그 점들이 도시의 활기가 됐어요.'] },
  { id:'wmmon682ca0', t:'점심 식사', te:'The Luncheon', a:'클로드 모네', as:'모네', y:'1873', m:'오르세 미술관', pos:'50% 50%', g:'imp', src:'https://commons.wikimedia.org/wiki/File:Claude_Monet_-_The_Luncheon_-_Google_Art_Project.jpg',
    story:['아르장퇴유 집 정원에서 점심을 마친 뒤의 한가한 오후예요.', '그늘에서 혼자 노는 아들 장과 식탁 위에 남은 음식, 걸어 둔 모자까지 여름날의 여유가 묻어나요.'] },
  { id:'wmmon748789', t:'등나무', te:'Wisteria', a:'클로드 모네', as:'모네', y:'1917–20', m:'헤이그 시립미술관', pos:'50% 50%', g:'imp', src:'https://commons.wikimedia.org/wiki/File:Claude_Monet_-_Wisteria_-_Google_Art_Project.jpg',
    story:['모네가 말년에 대형 수련 장식화 위를 두르려고 그린 등나무 그림이에요.', '계획은 결국 실현되지 않았지만, 늘어진 보랏빛 꽃송이만으로도 정원의 향기가 느껴져요.'] },
  { id:'wmmonbb5a9d', t:'노란 붓꽃', te:'Yellow Irises', a:'클로드 모네', as:'모네', y:'1914–17', m:'국립서양미술관, 도쿄', pos:'50% 50%', g:'imp', src:'https://commons.wikimedia.org/wiki/File:Claude_Monet_-_Yellow_Irises_-_Google_Art_Project.jpg',
    story:['지베르니 정원의 연못가에 핀 노란 붓꽃을 아래에서 올려다보듯 그렸어요.', '모네는 정원을 직접 가꾸며 "내 정원이 내 가장 아름다운 작품"이라고 말했어요.'] },
  { id:'wmmon796146', t:'채링크로스 다리', te:'Charing Cross Bridge', a:'클로드 모네', as:'모네', y:'1899–1901', m:'티센-보르네미사 미술관', pos:'50% 50%', g:'imp', src:'https://commons.wikimedia.org/wiki/File:Claude_Monet_-_Charing_Cross_Bridge_-_Google_Art_Project.jpg',
    story:['런던 연작 가운데 하나로, 안개 속 채링크로스 다리를 그렸어요.', '다리 위를 지나는 기차의 연기와 안개가 섞여, 다리가 물 위에 떠 있는 것처럼 보여요.'] },
  { id:'wmmona4847e', t:'두칼레 궁전', te:'The Doge\'s Palace', a:'클로드 모네', as:'모네', y:'1908', m:'브루클린 미술관', pos:'50% 50%', g:'imp', src:'https://commons.wikimedia.org/wiki/File:Claude_Monet_-_The_Doges_Palace_(Le_Palais_ducal)_-_Google_Art_Project.jpg',
    story:['1908년 모네는 처음이자 마지막으로 베네치아를 여행했어요.', '물 위에 떠 있는 두칼레 궁전을 그리고, 지베르니에 돌아와 몇 년에 걸쳐 마무리했어요.'] },
  { id:'wmmon78acd7', t:'보르디게라의 별장들', te:'Villas at Bordighera', a:'클로드 모네', as:'모네', y:'1884', m:'산타바버라 미술관', pos:'50% 50%', g:'imp', src:'https://commons.wikimedia.org/wiki/File:Claude_Monet_-_Villas_at_Bordighera_-_Google_Art_Project.jpg',
    story:['1884년 이탈리아 리비에라의 보르디게라에서 그렸어요.', '노르망디와 전혀 다른 강렬한 남쪽 햇빛 때문에, 모네는 이곳의 색을 담기가 어렵다고 털어놓았어요.'] },
  { id:'wmmona8d6f1', t:'푸르빌 절벽 산책', te:'The Cliff Walk at Pourville', a:'클로드 모네', as:'모네', y:'1882', m:'시카고 미술관', pos:'50% 50%', g:'imp', src:'https://commons.wikimedia.org/wiki/File:Claude_Monet_-_Cliff_Walk_at_Pourville_-_Google_Art_Project.jpg',
    story:['노르망디 바닷가 푸르빌의 절벽 위를 두 여인이 걷고 있어요.', '바람에 흔들리는 풀과 반짝이는 바다, 탁 트인 하늘이 화면 대부분을 채워요.'] },
  { id:'wmmun60ff7a', t:'별이 빛나는 밤', te:'Starry Night', a:'에드바르 뭉크', as:'뭉크', y:'1893', m:'게티 미술관', pos:'50% 50%', g:'exp', src:'https://commons.wikimedia.org/wiki/File:Edvard_Munch_-_Starry_Night_(1893_Getty).jpg',
    story:['뭉크가 여름마다 지내던 바닷가 마을 오스고르스트란의 밤이에요.', '고흐의 「별이 빛나는 밤」과 이름은 같지만 훨씬 고요해요. 물가의 그림자와 별빛이 쓸쓸하게 이어져요.'] },
  { id:'wmmunebca58', t:'저녁, 멜랑콜리 I', te:'Evening. Melancholy I', a:'에드바르 뭉크', as:'뭉크', y:'1896', m:'뭉크 미술관', pos:'50% 50%', g:'exp', src:'https://commons.wikimedia.org/wiki/File:Edvard_Munch_-_Evening._Melancholy_I_-_Google_Art_Project.jpg',
    story:['실연한 친구의 모습을 바닷가에 앉은 남자로 그린 목판화예요.', '뭉크가 처음 시도한 목판화 가운데 하나예요. 나뭇결이 그대로 찍혀 나와 쓸쓸함이 더 짙어요.'] },
  { id:'wmmuncef420', t:'생클루의 센강', te:'The Seine at Saint-Cloud', a:'에드바르 뭉크', as:'뭉크', y:'1890', m:'뭉크 미술관', pos:'50% 50%', g:'exp', src:'https://commons.wikimedia.org/wiki/File:Edvard_Munch_-_The_Seine_at_Saint-Cloud_-_Google_Art_Project.jpg',
    story:['아버지를 잃은 1889년 겨울, 뭉크는 파리 근교 생클루에서 지냈어요.', '창밖의 센강을 그리던 이 무렵, 그는 "숨 쉬고 느끼고 괴로워하고 사랑하는 사람을 그리겠다"고 다짐했어요.'] },
  { id:'wmmun2604a4', t:'카를 요한 거리의 음악', te:'Music on Karl Johan Street', a:'에드바르 뭉크', as:'뭉크', y:'1889', m:'취리히 미술관', pos:'50% 50%', g:'exp', src:'https://commons.wikimedia.org/wiki/File:Edvard_Munch_-_Music_on_the_Karl_Johan_Street_(1889).jpg',
    story:['오슬로의 중심 거리 카를 요한에서 군악대가 행진하는 맑은 날이에요.', '뭉크의 그림 가운데 드물게 밝은 장면이에요. 인상주의를 공부하던 젊은 시절의 그림이에요.'] },
  { id:'wmmunb6e0b1', t:'해골 팔이 있는 자화상', te:'Self-Portrait with Skeleton Arm', a:'에드바르 뭉크', as:'뭉크', y:'1895', m:'오슬로 국립미술관', pos:'50% 50%', g:'exp', src:'https://commons.wikimedia.org/wiki/File:Edvard_Munch_-_Self-Portrait_with_Skeleton_Arm_-_Google_Art_Project.jpg',
    story:['검은 배경에서 얼굴이 떠오르고, 아래쪽에는 해골 팔이 그려진 석판화 자화상이에요.', '서른 남짓한 뭉크가 삶과 죽음을 늘 함께 의식하고 있었다는 걸 보여 줘요.'] },
  { id:'wmmun34ec05', t:'와인병이 있는 자화상', te:'Self-Portrait with a Bottle of Wine', a:'에드바르 뭉크', as:'뭉크', y:'1906', m:'뭉크 미술관', pos:'50% 50%', g:'exp', src:'https://commons.wikimedia.org/wiki/File:Edvard_Munch_-_Self-Portrait_with_a_Bottle_of_Wine_-_Google_Art_Project.jpg',
    story:['텅 빈 식당에 홀로 앉은 자화상이에요. 뒤편의 웨이터들은 그에게 등을 돌리고 있어요.', '사람들 속에서 느끼는 외로움을 가장 솔직하게 그린 자화상으로 꼽혀요.'] },
  { id:'wmmun616ce6', t:'뱀파이어', te:'Vampire', a:'에드바르 뭉크', as:'뭉크', y:'1895', m:'뭉크 미술관', pos:'50% 50%', g:'exp', src:'https://commons.wikimedia.org/wiki/File:Edvard_Munch_-_Vampire_(1895)_-_Google_Art_Project.jpg',
    story:['원래 제목은 「사랑과 고통」이었어요. 어느 비평가가 「뱀파이어」라고 부르면서 이름이 바뀌었어요.', '뭉크는 사람을 해치는 장면이 아니라, 위로하듯 기대는 두 사람을 그렸다고 말했어요.'] },
  { id:'wmmunecff5c', t:'키스', te:'The Kiss', a:'에드바르 뭉크', as:'뭉크', y:'1897', m:'뭉크 미술관', pos:'50% 50%', g:'exp', src:'https://commons.wikimedia.org/wiki/File:Edvard_Munch_-_The_Kiss_-_Google_Art_Project.jpg',
    story:['창가에서 두 사람이 입을 맞추며 얼굴이 하나로 녹아들어요.', '뭉크는 이 장면을 그림과 판화로 여러 번 만들었어요. 사랑에 빠진 두 사람이 서로에게 섞이는 순간이에요.'] },
  { id:'wmmun97a11c', t:'불안', te:'Anxiety', a:'에드바르 뭉크', as:'뭉크', y:'1894', m:'뭉크 미술관', pos:'50% 50%', g:'exp', src:'https://commons.wikimedia.org/wiki/File:Edvard_Munch_-_Anxiety_-_Google_Art_Project.jpg',
    story:['「절규」와 같은 붉은 하늘과 피오르 다리 위에, 이번에는 무표정한 사람들이 줄지어 서 있어요.', '혼자가 아니라 여럿이 함께 느끼는 불안을 그렸어요.'] },
  { id:'wmmund9d021', t:'병실에서의 죽음', te:'Death in the Sickroom', a:'에드바르 뭉크', as:'뭉크', y:'1893', m:'오슬로 국립미술관', pos:'50% 50%', g:'exp', src:'https://commons.wikimedia.org/wiki/File:Edvard_Munch_-_Death_in_the_Sickroom_-_Google_Art_Project.jpg',
    story:['뭉크는 열세 살에 누나 소피를 결핵으로 잃었어요.', '어른이 된 뒤 그날의 병실을 기억으로 다시 그렸어요. 가족들은 서로를 보지 못한 채 각자의 슬픔에 잠겨 있어요.'] },
  { id:'wmmun9b984c', t:'오스고르스트란의 네 소녀', te:'Four Girls in Åsgårdstrand', a:'에드바르 뭉크', as:'뭉크', y:'1903', m:'뭉크 미술관', pos:'50% 50%', g:'exp', src:'https://commons.wikimedia.org/wiki/File:Edvard_Munch_-_Four_Girls_in_Åsgårdstrand_-_Google_Art_Project.jpg',
    story:['여름 바닷가 마을 오스고르스트란의 네 자매를 그렸어요.', '나란히 선 아이들을 납작하고 단순하게 그려서, 동화 속 한 장면처럼 보여요.'] },
  { id:'wmmun801352', t:'질주하는 말', te:'Galloping Horse', a:'에드바르 뭉크', as:'뭉크', y:'1910–12', m:'뭉크 미술관', pos:'50% 50%', g:'exp', src:'https://commons.wikimedia.org/wiki/File:Edvard_Munch_-_Galloping_Horse_-_Google_Art_Project.jpg',
    story:['눈 덮인 길에서 말이 우리 쪽으로 질주해 와요. 길가의 사람들이 놀라 비켜서요.', '그림 밖으로 튀어나올 것 같은 속도감이 마치 영화의 한 장면 같아요.'] },
  { id:'wmmunc55bf9', t:'질투', te:'Jealousy', a:'에드바르 뭉크', as:'뭉크', y:'1907', m:'뭉크 미술관', pos:'50% 50%', g:'exp', src:'https://commons.wikimedia.org/wiki/File:Edvard_Munch_-_Jealousy_-_Google_Art_Project.jpg',
    story:['앞쪽의 창백한 남자 뒤로, 한 쌍의 남녀가 정원에 서 있어요.', '뭉크는 질투라는 감정을 여러 번 그렸어요. 마음속 장면이 남자의 뒤편에 펼쳐진 것처럼 보여요.'] },
  { id:'wmmun2b7e51', t:'목소리, 여름밤', te:'The Voice, Summer Night', a:'에드바르 뭉크', as:'뭉크', y:'1896', m:'뭉크 미술관', pos:'50% 50%', g:'exp', src:'https://commons.wikimedia.org/wiki/File:Edvard_Munch_-_The_Voice_,_Summer_Night_-_Google_Art_Project.jpg',
    story:['여름밤 숲속 바닷가, 하얀 옷을 입은 여인이 우리를 바라봐요.', '물 위에는 달빛 기둥이 비쳐요. 첫사랑의 설렘과 망설임이 함께 담긴 그림이에요.'] },
  { id:'wmmunc3826b', t:'건초 베는 사람', te:'The Haymaker', a:'에드바르 뭉크', as:'뭉크', y:'1916', m:'뭉크 미술관', pos:'50% 50%', g:'exp', src:'https://commons.wikimedia.org/wiki/File:Edvard_Munch_-_The_Haymaker_-_Google_Art_Project.jpg',
    story:['오슬로 근교 에켈리의 농장에서 일하던 남자를 그렸어요.', '말년의 뭉크는 불안과 고통 대신 밝은 들판과 일하는 사람들을 즐겨 그렸어요.'] },
  { id:'wmmun8e4d97', t:'태양', te:'The Sun', a:'에드바르 뭉크', as:'뭉크', y:'1910–13', m:'오슬로 대학교 강당', pos:'50% 50%', g:'exp', src:'https://commons.wikimedia.org/wiki/File:Edvard_Munch_-_The_Sun_-_Google_Art_Project.jpg',
    story:['오슬로 대학교 강당 정면을 위해 그린 대형 벽화의 바탕이 된 그림이에요.', '바위 해안 위로 떠오르는 해가 사방으로 빛을 뿜어요. 「절규」의 화가가 그린 가장 환한 그림이에요.'] },
  { id:'wmmun265e60', t:'귀가하는 노동자들', te:'Workers on their Way Home', a:'에드바르 뭉크', as:'뭉크', y:'1913–14', m:'뭉크 미술관', pos:'50% 50%', g:'exp', src:'https://commons.wikimedia.org/wiki/File:Edvard_Munch_-_Workers_on_their_Way_Home_-_Google_Art_Project.jpg',
    story:['일을 마친 노동자들이 무리 지어 우리 쪽으로 걸어와요.', '앞사람은 크게, 뒷사람은 작게 그려 행렬이 화면 밖으로 쏟아져 나오는 것 같아요.'] },
  { id:'wmmun11f9e0', t:'기차 연기', te:'Train Smoke', a:'에드바르 뭉크', as:'뭉크', y:'1900', m:'뭉크 미술관', pos:'50% 50%', g:'exp', src:'https://commons.wikimedia.org/wiki/File:Edvard_Munch_-_Train_Smoke_-_Google_Art_Project.jpg',
    story:['바닷가를 따라 달리는 기차의 연기가 길게 꼬리를 그려요.', '단순한 풍경 속에서도 뭉크는 움직임과 시간의 흐름을 놓치지 않았어요.'] },
  { id:'wmmun8f290a', t:'노란 통나무', te:'The Yellow Log', a:'에드바르 뭉크', as:'뭉크', y:'1912', m:'뭉크 미술관', pos:'50% 50%', g:'exp', src:'https://commons.wikimedia.org/wiki/File:Edvard_Munch_-_The_Yellow_Log_-_Google_Art_Project.jpg',
    story:['눈 덮인 숲에 노란 통나무가 깊숙이 놓여 있어요.', '통나무를 따라 시선이 숲 안쪽으로 빨려 들어가요. 원근법을 이렇게 과감하게 쓴 풍경은 드물어요.'] },
  { id:'wmtur20ef30', t:'줄리엣과 유모', te:'Juliet and her Nurse', a:'윌리엄 터너', as:'터너', y:'1836', m:'포르타바트 컬렉션', pos:'50% 50%', g:'exp', src:'https://commons.wikimedia.org/wiki/File:J._M._W._Turner_-_Juliet_and_her_Nurse_(1836)_Google_Art_Project.jpg',
    story:['셰익스피어의 줄리엣을 베로나가 아닌 베네치아의 산마르코 광장에 데려다 놓았어요.', '비평가들의 혹평에 젊은 존 러스킨이 터너를 변호하는 글을 썼고, 이 일이 그의 유명한 미술론의 출발점이 됐어요.'] },
  { id:'wmturcd365d', t:'붉은 리기산', te:'The Red Rigi', a:'윌리엄 터너', as:'터너', y:'1842', m:'빅토리아 국립미술관', pos:'50% 50%', g:'exp', src:'https://commons.wikimedia.org/wiki/File:J._M._W._Turner_-_The_Red_Rigi_-_Google_Art_Project.jpg',
    story:['스위스 루체른 호수에서 바라본 리기산을 해 질 녘에 그린 수채화예요.', '터너는 같은 산을 푸른빛, 어두운 빛, 붉은빛으로 여러 번 그렸어요. 이 그림은 하루가 끝나는 붉은 순간이에요.'] },
  { id:'wmtur8c64ac', t:'게르마니쿠스의 유골을 안고 상륙하는 아그리피나', te:'Agrippina Landing with the Ashes of Germanicus', a:'윌리엄 터너', as:'터너', y:'1839', m:'테이트', pos:'50% 50%', g:'exp', src:'https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner_-_Ancient_Rome;_Agrippina_Landing_with_the_Ashes_of_Germanicus_-_Google_Art_Project.jpg',
    story:['고대 로마의 아그리피나가 남편 게르마니쿠스의 유골을 안고 항구에 도착하는 장면이에요.', '이야기의 주인공은 작게 그리고, 황금빛 노을과 웅장한 도시를 크게 그렸어요. 터너다운 선택이에요.'] },
  { id:'wmtur3e4cc3', t:'스타파, 핑갈의 동굴', te:'Staffa, Fingal\'s Cave', a:'윌리엄 터너', as:'터너', y:'1832', m:'예일 영국미술센터', pos:'50% 50%', g:'exp', src:'https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner_-_Staffa,_Fingal\'s_Cave_-_Google_Art_Project.jpg',
    story:['1831년 터너는 스코틀랜드 스타파섬을 증기선으로 찾았다가 거친 날씨를 만났어요.', '그 기억을 담은 이 그림은 미국으로 건너간 터너의 첫 유화가 됐어요.'] },
  { id:'wmtur90806e', t:'바다의 어부들', te:'Fishermen at Sea', a:'윌리엄 터너', as:'터너', y:'1796', m:'테이트', pos:'50% 50%', g:'exp', src:'https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner_-_Fishermen_at_Sea_-_Google_Art_Project.jpg',
    story:['스물한 살의 터너가 왕립 아카데미에 처음 선보인 유화예요.', '차가운 달빛과 어부들의 붉은 등불이 거친 바다 위에서 대비를 이뤄요.'] },
  { id:'wmturb61091', t:'달빛 아래 석탄을 싣는 인부들', te:'Keelmen Heaving in Coals by Moonlight', a:'윌리엄 터너', as:'터너', y:'1835', m:'워싱턴 내셔널 갤러리', pos:'50% 50%', g:'exp', src:'https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner_-_Keelmen_Heaving_in_Coals_by_Moonlight_-_Google_Art_Project.jpg',
    story:['영국 뉴캐슬의 타인강에서 밤새 석탄을 싣는 인부들을 그렸어요.', '달빛과 횃불, 배들의 검은 실루엣이 산업 시대의 밤을 낭만적으로 보여 줘요.'] },
  { id:'wmtur549220', t:'글라우코스와 스킬라', te:'Glaucus and Scylla', a:'윌리엄 터너', as:'터너', y:'1841', m:'킴벨 미술관', pos:'50% 50%', g:'exp', src:'https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner_-_Glaucus_and_Scylla_-_Google_Art_Project.jpg',
    story:['오비디우스의 『변신 이야기』 속, 바다의 신 글라우코스가 님프 스킬라에게 반하는 장면이에요.', '신화 속 인물보다 아침 햇살에 물든 바다와 공기가 더 주인공처럼 보여요.'] },
  { id:'wmture51127', t:'바이아이 만, 아폴론과 시빌레', te:'The Bay of Baiae, with Apollo and the Sibyl', a:'윌리엄 터너', as:'터너', y:'1823', m:'테이트', pos:'50% 50%', g:'exp', src:'https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner_-_The_Bay_of_Baiae,_with_Apollo_and_the_Sibyl_-_Google_Art_Project.jpg',
    story:['이탈리아 나폴리 근처의 바이아이 만에 아폴론과 무녀 시빌레를 그려 넣었어요.', '시빌레는 모래알만큼 긴 수명을 얻었지만 젊음을 청하는 걸 잊었대요. 아름다운 풍경 속에 덧없음을 숨겼어요.'] },
  { id:'wmtur511ffd', t:'도르트레흐트', te:'Dort or Dordrecht', a:'윌리엄 터너', as:'터너', y:'1818', m:'예일 영국미술센터', pos:'50% 50%', g:'exp', src:'https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner_-_Dort_or_Dordrecht-_The_Dort_Packet-Boat_from_Rotterdam_Becalmed_-_Google_Art_Project.jpg',
    story:['바람이 멎은 네덜란드 도르트레흐트 앞바다에 여객선이 멈춰 서 있어요.', '터너가 존경하던 네덜란드 화가 카위프에게 보내는 경의가 담긴 그림이에요.'] },
  { id:'wmtur52cd04', t:'방향을 트는 반 트롬프', te:'Van Tromp, Going About to Please his Masters', a:'윌리엄 터너', as:'터너', y:'1844', m:'로열 홀러웨이', pos:'50% 50%', g:'exp', src:'https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner_(British_-_Van_Tromp,_Going_About_to_Please_His_Masters_-_Google_Art_Project.jpg',
    story:['17세기 네덜란드의 제독 반 트롬프가 탄 배가 거친 바다에서 방향을 트는 장면이에요.', '터너는 반 트롬프를 주인공으로 여러 점을 그렸어요. 바다와 바람에 대한 그의 오랜 관심이 담겨 있어요.'] },
  { id:'wmtur4f2d8f', t:'자화상', te:'Self-Portrait', a:'윌리엄 터너', as:'터너', y:'1799년경', m:'테이트', pos:'50% 50%', g:'exp', src:'https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner_-_Self-Portrait_-_Google_Art_Project.jpg',
    story:['터너가 스물네 살 무렵 그린 자화상이에요. 이 무렵 그는 왕립 아카데미 준회원으로 뽑혔어요.', '빛과 바다를 그린 화가로 기억되지만, 그 시작은 이렇게 단정한 젊은이였어요.'] },
  { id:'wmtur2262ee', t:'라위스달 항구', te:'Port Ruysdael', a:'윌리엄 터너', as:'터너', y:'1827', m:'예일 영국미술센터', pos:'50% 50%', g:'exp', src:'https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner_-_Port_Ruysdael_-_Google_Art_Project.jpg',
    story:['실제로 없는 항구예요. 터너가 존경하던 네덜란드 화가 라위스달의 이름을 붙였어요.', '거센 파도와 낮게 깔린 구름, 바다 그림의 선배에게 바치는 상상 속 풍경이에요.'] },
  { id:'wmtura3d701', t:'창백한 말 위의 죽음', te:'Death on a Pale Horse', a:'윌리엄 터너', as:'터너', y:'1825–30년경', m:'테이트', pos:'50% 50%', g:'exp', src:'https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner_-_Death_on_a_pale_horse_-_Google_Art_Project.jpg',
    story:['요한계시록의 "창백한 말을 탄 죽음"을 그린 그림이에요.', '형체가 거의 녹아내린 듯 흐릿해요. 아버지를 잃은 무렵의 슬픔이 담겼다는 해석도 있어요.'] },
  { id:'wmturdb590b', t:'호수에서 본 루체른', te:'Lucerne from the Lake', a:'윌리엄 터너', as:'터너', y:'1845', m:'메트로폴리탄 미술관', pos:'50% 50%', g:'exp', src:'https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner_-_Lucerne_from_the_Lake_-_Google_Art_Project.jpg',
    story:['터너는 말년에 스위스를 자주 찾아 호수 풍경을 수채화로 남겼어요.', '호수와 산과 하늘이 엷은 색으로 번져, 아침 안개 속 루체른이 꿈처럼 떠올라요.'] },
  { id:'wmtur3e4166', t:'벨록 등대', te:'Bell Rock Lighthouse', a:'윌리엄 터너', as:'터너', y:'1819', m:'스코틀랜드 국립미술관', pos:'50% 50%', g:'exp', src:'https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner_-_Bell_Rock_Lighthouse_-_Google_Art_Project.jpg',
    story:['스코틀랜드 앞바다 암초 위에 세운 벨록 등대가 거센 파도를 맞고 있어요.', '등대를 지은 기술자의 책에 넣을 삽화로 그린 수채화예요.'] },
  { id:'wmturfee3f6', t:'로잔의 달', te:'Moon over Lausanne', a:'윌리엄 터너', as:'터너', y:'1841년경', m:'테이트', pos:'50% 50%', g:'exp', src:'https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner_-_Moon_over_Lausanne_-_Google_Art_Project.jpg',
    story:['스위스 여행 중 그린 로잔의 달밤이에요.', '몇 번의 붓질만으로 달빛이 번지는 호숫가를 그렸어요. 터너의 여행 스케치에는 이런 순간이 수백 장 남아 있어요.'] },
  { id:'wmkan0aa900', t:'인상 III (콘서트)', te:'Impression III (Concert)', a:'바실리 칸딘스키', as:'칸딘스키', y:'1911', m:'렌바흐하우스', pos:'50% 50%', g:'abs', src:'https://commons.wikimedia.org/wiki/File:Wassily_Kandinsky_-_Impression_III_(Concert)_-_Google_Art_Project.jpg',
    story:['1911년 1월 뮌헨에서 쇤베르크의 음악회를 듣고 그린 그림이에요.', '커다란 검은 형태는 피아노, 노란 물결은 음악이에요. 칸딘스키는 이 음악회 뒤 쇤베르크와 편지를 주고받으며 친구가 됐어요.'] },
  { id:'wmkanfd7937', t:'인상 V (공원)', te:'Impression V (Park)', a:'바실리 칸딘스키', as:'칸딘스키', y:'1911', m:'퐁피두 센터', pos:'50% 50%', g:'abs', src:'https://commons.wikimedia.org/wiki/File:Impression_V_(Park)_by_Wassily_Kandinsky,_1911,_GAC.jpg',
    story:['칸딘스키는 그림을 「인상」, 「즉흥」, 「구성」으로 나눴어요. 「인상」은 바깥 세계에서 받은 느낌을 그린 그림이에요.', '말 탄 사람과 산책하는 사람들이 보이는 공원이 색과 선으로 흩어지고 있어요.'] },
  { id:'wmkanabf82e', t:'즉흥 14', te:'Improvisation 14', a:'바실리 칸딘스키', as:'칸딘스키', y:'1910', m:'퐁피두 센터', pos:'50% 50%', g:'abs', src:'https://commons.wikimedia.org/wiki/File:Improvisation_14_-_Wassily_Kandinsky,_GAC.jpg',
    story:['「즉흥」은 마음속에서 저절로 떠오른 것을 그린 그림이라고 칸딘스키가 설명했어요.', '말과 사람의 흔적이 남아 있지만, 이제 색이 형태보다 먼저 말을 걸어요.'] },
  { id:'wmkan1a377f', t:'회색 속에서', te:'In Grey', a:'바실리 칸딘스키', as:'칸딘스키', y:'1919', m:'퐁피두 센터', pos:'50% 50%', g:'abs', src:'https://commons.wikimedia.org/wiki/File:Kandinsky_-_Im_Grau,_1919,_GAC.jpg',
    story:['러시아 혁명 뒤 모스크바에서 그린 그림이에요.', '회색 바탕 위에 색 덩어리들이 떠다녀요. 혼란스러운 시대 속 조용한 내면 같아요.'] },
  { id:'wmkan67b23a', t:'기수가 있는 그림', te:'Picture with Rider', a:'바실리 칸딘스키', as:'칸딘스키', y:'1912', m:'렌바흐하우스', pos:'50% 50%', g:'abs', src:'https://commons.wikimedia.org/wiki/File:Kandinsky_-_Mit_Reiter,_1912,_GAC.jpg',
    story:['칸딘스키에게 말 탄 기수는 낡은 것을 넘어서는 용기의 상징이었어요.', '1911년 그가 친구들과 만든 미술 모임의 이름도 「청기사(푸른 기수)」였어요.'] },
  { id:'wmkan64fecc', t:'붉은 점이 있는 그림', te:'Painting with Red Spot', a:'바실리 칸딘스키', as:'칸딘스키', y:'1914', m:'퐁피두 센터', pos:'50% 50%', g:'abs', src:'https://commons.wikimedia.org/wiki/File:Kandinsky_-_Bild_mit_rotem_Fleck,_GAC.jpg',
    story:['1차 세계대전이 일어나던 해에 그린 그림이에요.', '붉은 점 하나가 화면 전체의 무게중심을 잡고 있어요. 칸딘스키는 색에도 온도와 무게가 있다고 믿었어요.'] },
  { id:'wmkanbf0d25', t:'검은 점', te:'Black Spot', a:'바실리 칸딘스키', as:'칸딘스키', y:'1912', m:'러시아 국립미술관', pos:'50% 50%', g:'abs', src:'https://commons.wikimedia.org/wiki/File:Black_Spot_-_Wassily_Kandinsky.jpg',
    story:['검은 점 주변으로 색들이 소용돌이치듯 퍼져 나가요.', '구체적인 대상이 거의 사라진, 칸딘스키가 추상으로 건너가던 시기의 그림이에요.'] },
  { id:'wmkan2d229d', t:'검은 격자', te:'Black Grid', a:'바실리 칸딘스키', as:'칸딘스키', y:'1922', m:'퐁피두 센터', pos:'50% 50%', g:'abs', src:'https://commons.wikimedia.org/wiki/File:Black_Grid_-_Wassily_Kandinsky.jpg',
    story:['칸딘스키가 독일의 디자인 학교 바우하우스에서 가르치기 시작한 해에 그렸어요.', '흐르던 색이 검은 격자와 원, 직선으로 정리돼요. 그의 그림이 점점 기하학적으로 바뀌어요.'] },
  { id:'wmkan04fe40', t:'노랑-빨강-파랑', te:'Yellow-Red-Blue', a:'바실리 칸딘스키', as:'칸딘스키', y:'1925', m:'퐁피두 센터', pos:'50% 50%', g:'abs', src:'https://commons.wikimedia.org/wiki/File:Gelb-Rot-Blau,_by_Wassily_Kandinsky.jpg',
    story:['노랑, 빨강, 파랑 세 가지 색이 각자의 성격을 드러내는 그림이에요.', '칸딘스키는 노랑은 날카로운 삼각형, 빨강은 사각형, 파랑은 원과 어울린다고 생각했어요.'] },
  { id:'wmkan09eafb', t:'분홍 위의 강조', te:'Accent on Pink', a:'바실리 칸딘스키', as:'칸딘스키', y:'1926', m:'퐁피두 센터', pos:'50% 50%', g:'abs', src:'https://commons.wikimedia.org/wiki/File:Accent_on_Pink_-_Wassily_Kandinsky.jpg',
    story:['분홍빛 바탕 위에 크고 작은 원들이 떠 있어요.', '원은 칸딘스키가 가장 사랑한 형태예요. 그는 원이 가장 조용하면서도 가장 깊은 모양이라고 말했어요.'] },
  { id:'wmkane3bfd7', t:'흰색 위에 II', te:'On White II', a:'바실리 칸딘스키', as:'칸딘스키', y:'1923', m:'퐁피두 센터', pos:'50% 50%', g:'abs', src:'https://commons.wikimedia.org/wiki/File:Vassily_Kandinsky,_1923_-_On_White_II,_GAC.jpg',
    story:['하얀 바탕을 두 개의 검은 선이 가로질러요.', '칸딘스키에게 흰색은 "아직 시작되지 않은 침묵"이었어요. 그 위에서 색과 선이 소리처럼 울려요.'] },
  { id:'wmkan6473ec', t:'낭만적 풍경', te:'Romantic Landscape', a:'바실리 칸딘스키', as:'칸딘스키', y:'1911', m:'렌바흐하우스', pos:'50% 50%', g:'abs', src:'https://commons.wikimedia.org/wiki/File:Wassily_Kandinsky_-_Romantic_Landscape_-_Google_Art_Project.jpg',
    story:['세 명의 기수가 눈 덮인 언덕을 달려 내려가요.', '형태가 흐려지고 색이 앞으로 나서기 시작한 시기의 풍경화예요.'] },
  { id:'wmkan3d8b4e', t:'무르나우, 탑이 있는 풍경', te:'Murnau, Landscape with Tower', a:'바실리 칸딘스키', as:'칸딘스키', y:'1908', m:'퐁피두 센터', pos:'50% 50%', g:'abs', src:'https://commons.wikimedia.org/wiki/File:Murnau,_Landschaft_mit_Turm_-_Kandinsky,_GAC.jpg',
    story:['바이에른의 작은 마을 무르나우에서 화가 가브리엘레 뮌터와 함께 지내며 그렸어요.', '이곳의 맑은 빛과 민속 그림을 만나면서 칸딘스키의 색이 크게 대담해졌어요.'] },
  { id:'wmkan4b0cbe', t:'코헬 호수와 헤르초크슈탄트', te:'Kochel Lake and Herzogstand', a:'바실리 칸딘스키', as:'칸딘스키', y:'1902', m:'렌바흐하우스', pos:'50% 50%', g:'abs', src:'https://commons.wikimedia.org/wiki/File:Kochel_Lake_and_Herzogstand_-_Wassily_Kandinsky,_GAC.jpg',
    story:['뮌헨에서 미술 학교를 이끌던 시절, 학생들과 함께 코헬 호숫가로 야외 사생을 나가 그렸어요.', '추상화가가 되기 전, 칸딘스키도 이렇게 자연을 앞에 두고 풍경을 그렸어요.'] },
  { id:'wmkan6dcc48', t:'아랍 도시', te:'Arab City', a:'바실리 칸딘스키', as:'칸딘스키', y:'1905', m:'퐁피두 센터', pos:'50% 50%', g:'abs', src:'https://commons.wikimedia.org/wiki/File:Arab_City_-_Wassily_Kandinsky,_1905.jpg',
    story:['1904년 겨울부터 이듬해까지 튀니지를 여행하며 본 도시를 그렸어요.', '하얀 집과 강한 햇빛, 낯선 색의 경험이 그의 그림에 오래 남았어요.'] },
  { id:'wmkand52f8b', t:'튀니스 거리', te:'Tunis Street', a:'바실리 칸딘스키', as:'칸딘스키', y:'1905', m:'퐁피두 센터', pos:'50% 50%', g:'abs', src:'https://commons.wikimedia.org/wiki/File:Tunis_Street_-_Wassily_Kandinsky,_GAC.jpg',
    story:['튀니스의 골목을 오가는 사람들을 짧은 색 점으로 그렸어요.', '여행지의 강렬한 빛 속에서 칸딘스키는 색이 형태보다 먼저 눈에 들어온다는 걸 느꼈어요.'] },
  { id:'wmkan0de1b9', t:'라팔로, 폭풍의 바다', te:'Rapallo, Stormy Sea', a:'바실리 칸딘스키', as:'칸딘스키', y:'1906', m:'렌바흐하우스', pos:'50% 50%', g:'abs', src:'https://commons.wikimedia.org/wiki/File:Rapallo_Stormy_Sea_-_Wassily_Kandinsky,_GAC.jpg',
    story:['1905년 겨울, 칸딘스키는 이탈리아의 해안 마을 라팔로에서 지냈어요.', '흐린 하늘과 거센 바다를 어두운 색으로 빠르게 그린 작은 풍경이에요.'] },
  { id:'wmkanf89fe0', t:'슈바빙의 겨울', te:'Winter in Schwabing', a:'바실리 칸딘스키', as:'칸딘스키', y:'1901', m:'렌바흐하우스', pos:'50% 50%', g:'abs', src:'https://commons.wikimedia.org/wiki/File:Winter_in_Schwabing_-_Wassily_Kandinsky,_GAC.jpg',
    story:['칸딘스키가 살던 뮌헨의 예술가 동네 슈바빙의 겨울이에요.', '서른 살에 법학을 접고 그림을 시작한 그가 뮌헨에서 막 화가로 자리 잡던 무렵이에요.'] },
  { id:'wmkan17d289', t:'옛 러시아의 풍경', te:'Old Russia', a:'바실리 칸딘스키', as:'칸딘스키', y:'1904', m:'렌바흐하우스', pos:'50% 50%', g:'abs', src:'https://commons.wikimedia.org/wiki/File:Kandinsky,_Wassily_-_Altrussisches,_1904,_GAC.jpg',
    story:['어두운 바탕 위에 옛 러시아의 마을과 사람들을 동화처럼 그렸어요.', '고향 러시아의 민담과 색채는 칸딘스키가 추상화가가 된 뒤에도 그림 깊숙이 남아 있었어요.'] },
  { id:'wmpic62c237', t:'에드타오니슬 (성직자)', te:'Edtaonisl (Ecclesiastic)', a:'프랑시스 피카비아', as:'피카비아', y:'1913', m:'시카고 미술관', pos:'50% 50%', g:'abs', src:'https://commons.wikimedia.org/wiki/File:Francis_Picabia,_1913,_Edtaonisl_(Ecclesiastic),_oil_on_canvas,_300.4_x_300.7_cm,_Art_Institute_of_Chicago.jpg',
    story:['1913년 뉴욕 아모리 쇼에 가던 배 위에서 본 장면, 무용수와 그에게 마음을 빼앗긴 성직자에서 시작한 그림이에요.', '알 수 없는 제목은 프랑스어 단어 철자를 섞어 만든 말이에요. 피카비아다운 장난이에요.'] },
  { id:'wmpic1f93d2', t:'캐치 애즈 캐치 캔', te:'Catch as Catch Can', a:'프랑시스 피카비아', as:'피카비아', y:'1913', m:'필라델피아 미술관', pos:'50% 50%', g:'abs', src:'https://commons.wikimedia.org/wiki/File:Francis_Picabia,_1913,_Catch_as_Catch_Can,_oil_on_canvas,_100.6_x_81.6_cm,_Philadelphia_Museum_of_Art.jpg',
    story:['레슬링 경기에서 영감을 받은 그림이에요.', '서로 얽힌 몸이 각진 조각으로 흩어져, 힘과 움직임만 남았어요.'] },
  { id:'wmpicd113cd', t:'샘', te:'The Spring', a:'프랑시스 피카비아', as:'피카비아', y:'1912', m:'뉴욕 현대미술관', pos:'50% 50%', g:'abs', src:'https://commons.wikimedia.org/wiki/File:Francis_Picabia,_1912,_La_Source,_The_Spring,_oil_on_canvas,_249.6_x_249.3_cm,_Museum_of_Modern_Art,_New_York._Exhibited,_1912_Salon_d\'Automne,_Paris.jpg',
    story:['1912년 파리 살롱 도톤에 걸린 큰 그림이에요.', '샘에서 물을 긷는 장면이 갈색과 회색 조각으로 깨졌어요. 입체주의에서 출발해 추상으로 가는 길목의 작품이에요.'] },
  { id:'wmpic3dc9e3', t:'타란텔라', te:'Tarentelle', a:'프랑시스 피카비아', as:'피카비아', y:'1912', m:'뉴욕 현대미술관', pos:'50% 50%', g:'abs', src:'https://commons.wikimedia.org/wiki/File:Francis_Picabia,_1912,_Tarentelle,_oil_on_canvas,_73.6_x_92.1_cm,_Museum_of_Modern_Art,_New_York.jpg',
    story:['이탈리아의 빠른 춤 타란텔라를 제목으로 삼았어요.', '뒤엉킨 색 조각들이 춤의 리듬처럼 화면을 돌아요.'] },
  { id:'wmpic3080b0', t:'세비야의 행렬', te:'The Procession, Seville', a:'프랑시스 피카비아', as:'피카비아', y:'1912', m:'워싱턴 내셔널 갤러리', pos:'50% 50%', g:'abs', src:'https://commons.wikimedia.org/wiki/File:Francis_Picabia,_1912,_The_Procession,_Seville,_oil_on_canvas,_121.9_x_121.9_cm,_National_Gallery_of_Art,_Washington_DC.jpg',
    story:['스페인 세비야의 종교 행렬을 기억하며 그렸어요.', '뾰족한 두건을 쓴 행렬이 회색과 갈색의 각진 덩어리로 바뀌었어요.'] },
  { id:'wmpic0fd64d', t:'희극의 힘', te:'Force Comique', a:'프랑시스 피카비아', as:'피카비아', y:'1913–14', m:'버그루언 컬렉션', pos:'50% 50%', g:'abs', src:'https://commons.wikimedia.org/wiki/File:Francis_Picabia,_1913-14,_Force_Comique,_aquarelle_et_graphite_sur_papier,_63.4_x_52.7_cm,_Berkshire_Museum.jpg',
    story:['뉴욕에서 돌아온 뒤 그린 수채화예요.', '제목처럼 "희극의 힘"이 느껴지는 유쾌한 리듬이 있어요. 피카비아는 그림에 유머를 담는 걸 좋아했어요.'] },
  { id:'wmpic6de986', t:'항구', te:'The Port', a:'프랑시스 피카비아', as:'피카비아', y:'1922–23', m:'개인 소장', pos:'50% 50%', g:'abs', src:'https://commons.wikimedia.org/wiki/File:Francis_Picabia,_1922-23_-_Le_Port.jpg',
    story:['매끈하고 납작한 색면으로 단순하게 정리한 항구 풍경이에요.', '피카비아는 미술의 규칙을 비웃듯 재료도 화풍도 자주 바꿨어요.'] },
  { id:'wmpic2b20e5', t:'외알 안경을 쓴 여인', te:'Woman with Monocle', a:'프랑시스 피카비아', as:'피카비아', y:'1924', m:'개인 소장', pos:'50% 50%', g:'abs', src:'https://commons.wikimedia.org/wiki/File:Francis_Picabia,_1924_-_La_Femme_au_monocle.jpg',
    story:['1920년대 피카비아가 그린 「괴물」 연작 중 하나예요.', '반짝이 같은 장식과 과장된 얼굴, 일부러 "촌스럽게" 그려 점잖은 미술을 놀렸어요.'] },
  { id:'wmpicb46139', t:'해돋이', te:'Sunrise', a:'프랑시스 피카비아', as:'피카비아', y:'1924', m:'개인 소장', pos:'50% 50%', g:'abs', src:'https://commons.wikimedia.org/wiki/File:Francis_Picabia,_1924_-_Lever_de_soleil.jpg',
    story:['피카비아가 파리를 떠나 남프랑스로 옮겨 가던 무렵의 그림이에요.', '강렬한 색과 굵은 선으로 그린 인물이 해돋이처럼 화면을 밝혀요.'] },
  { id:'wmpic288983', t:'칸의 가면무도회', te:'Veglione, Cannes', a:'프랑시스 피카비아', as:'피카비아', y:'1924', m:'개인 소장', pos:'50% 50%', g:'abs', src:'https://commons.wikimedia.org/wiki/File:Francis_Picabia,_1924_-_Veglione,_Cannes.jpg',
    story:['칸에서 열린 화려한 가면무도회를 그렸어요.', '피카비아는 이 무렵 칸에서 파티와 자동차 경주를 즐기며 지냈어요. 그림에도 그 소란스러운 흥이 묻어나요.'] },
  { id:'wmpic59b6a0', t:'비 온 뒤의 연인들', te:'The Lovers after the Rain', a:'프랑시스 피카비아', as:'피카비아', y:'1925', m:'개인 소장', pos:'50% 50%', g:'abs', src:'https://commons.wikimedia.org/wiki/File:Francis_Picabia,_1925_-_Les_Amoureux_après_la_pluie.jpg',
    story:['「괴물」 연작 가운데 하나로, 비 그친 뒤 두 연인을 그렸어요.', '과장된 얼굴과 강렬한 색이 우스꽝스러우면서도 사랑스러워요.'] },
  { id:'wmpic485b63', t:'마르디 그라', te:'Mardi Gras', a:'프랑시스 피카비아', as:'피카비아', y:'1925', m:'개인 소장', pos:'50% 50%', g:'abs', src:'https://commons.wikimedia.org/wiki/File:Francis_Picabia,_1925_-_Mardi_gras.jpg',
    story:['축제 「마르디 그라」의 소란을 담은 그림이에요.', '가면, 색종이, 뒤섞인 얼굴들이 축제의 혼란을 그대로 옮겨 놓았어요.'] },
  { id:'wmpic395d29', t:'스페인 여인들', te:'Spanish Women', a:'프랑시스 피카비아', as:'피카비아', y:'1925년경', m:'개인 소장', pos:'50% 50%', g:'abs', src:'https://commons.wikimedia.org/wiki/File:Francis_Picabia,_1925c_-_Femmes_espagnoles.jpg',
    story:['스페인 여인들은 피카비아가 1920년대에 즐겨 그린 주제예요.', '부채와 꽃, 레이스를 한껏 장식적으로 그렸어요. 아방가르드 화가가 일부러 고른 대중적인 그림이에요.'] },
  { id:'wmpic239ead', t:'나무와 여인', te:'Woman with Trees', a:'프랑시스 피카비아', as:'피카비아', y:'1930', m:'개인 소장', pos:'50% 50%', g:'abs', src:'https://commons.wikimedia.org/wiki/File:Francis_Picabia,_1930_-_Femme_aux_arbres.webp',
    story:['1930년 무렵 피카비아는 여러 이미지를 투명하게 겹쳐 그리는 「투명화」 연작을 그렸어요.', '나무와 얼굴이 겹쳐 보여서, 한 그림 안에서 두 장면을 동시에 보게 돼요.'] },
  { id:'wmpic018901', t:'암젤', te:'Amsel', a:'프랑시스 피카비아', as:'피카비아', y:'1930', m:'개인 소장', pos:'50% 50%', g:'abs', src:'https://commons.wikimedia.org/wiki/File:Francis_Picabia-Amsel_ou_Sogesse_1930.jpg',
    story:['「투명화」 연작 중 하나로, 얼굴들이 유리창에 비친 것처럼 겹쳐 있어요.', '오래 들여다볼수록 숨은 형상이 하나씩 떠올라요.'] },
  { id:'wmmat29f069', t:'사과 그릇', te:'Bowl of Apples on a Table', a:'앙리 마티스', as:'마티스', y:'1916', m:'크라이슬러 미술관', pos:'50% 50%', g:'exp', src:'https://commons.wikimedia.org/wiki/File:Bol_de_pommes_sur_une_table,_Henri_Matisse,_1916.jpg',
    story:['탁자 위 사과 그릇을 단순한 색면과 굵은 윤곽으로 그렸어요.', '1차 세계대전 중에 그린 그림이에요. 이 무렵 마티스의 색은 차분해지고 구성은 더 단단해졌어요.'] },
  { id:'wmmatb360c1', t:'붉은 너도밤나무', te:'Purple Beeches', a:'앙리 마티스', as:'마티스', y:'1901', m:'개인 소장', pos:'50% 50%', g:'exp', src:'https://commons.wikimedia.org/wiki/File:Hêtres_pourpres,_Henri_Matisse,_1901.jpg',
    story:['붉은빛이 도는 너도밤나무 숲을 그린 젊은 마티스의 풍경화예요.', '야수파가 등장하기 몇 해 전이지만, 벌써 실제보다 강한 색을 쓰기 시작했어요.'] },
  { id:'wmmatd3358c', t:'수선화가 있는 정물', te:'Still Life with Asphodels', a:'앙리 마티스', as:'마티스', y:'1907', m:'폴크방 미술관', pos:'50% 50%', g:'exp', src:'https://commons.wikimedia.org/wiki/File:Nature_morte_aux_asphodèles,_Henri_Matisse,_1907.jpg',
    story:['꽃병에 꽂힌 수선화와 그 뒤의 무늬 천을 그린 정물이에요.', '마티스는 사물과 무늬를 똑같이 중요하게 다뤘어요. 그래서 화면 전체가 하나의 장식처럼 보여요.'] },
  { id:'wmmatb52bd2', t:'녹색 줄무늬 (마티스 부인의 초상)', te:'The Green Stripe', a:'앙리 마티스', as:'마티스', y:'1905', m:'덴마크 국립미술관', pos:'50% 50%', g:'exp', src:'https://commons.wikimedia.org/wiki/File:Portrait_de_Madame_Matisse,_la_ligne_verte.jpg',
    story:['아내 아멜리를 그린 초상이에요. 얼굴 한가운데를 초록 줄 하나가 가르고 있어요.', '빛과 그림자를 초록 줄과 색면으로 대신했어요. 처음엔 사람들이 놀랐지만, 지금은 야수파의 상징 같은 그림이에요.'] },
  { id:'wmmat748122', t:'붉은색의 조화', te:'Harmony in Red', a:'앙리 마티스', as:'마티스', y:'1908', m:'에르미타주 미술관', pos:'50% 50%', g:'exp', src:'https://commons.wikimedia.org/wiki/File:Matisse-The-Dessert-Harmony-in-Red-Henri-1908-fast.jpg',
    story:['원래는 파란색 그림이었어요. 마티스는 러시아 수집가 시추킨에게 보내기 직전, 전체를 빨강으로 다시 칠했어요.', '벽과 식탁보의 무늬가 하나로 이어져, 방 안과 창밖 정원이 같은 평면 위에 놓여요.'] },
  { id:'wmmatcd2116', t:'열린 창, 콜리우르', te:'Open Window, Collioure', a:'앙리 마티스', as:'마티스', y:'1905', m:'워싱턴 내셔널 갤러리', pos:'50% 50%', g:'exp', src:'https://commons.wikimedia.org/wiki/File:Open_Window,_Collioure,_1905_-_Henri_Matisse.jpg',
    story:['1905년 여름, 지중해 마을 콜리우르에서 화가 드랭과 함께 지내며 그렸어요.', '이해 가을 이런 강렬한 색의 그림들이 전시되자, 비평가들이 이들을 "야수"라고 불렀어요. 야수파의 시작이에요.'] },
  { id:'wmmatff80ca', t:'금붕어', te:'Goldfish', a:'앙리 마티스', as:'마티스', y:'1912', m:'푸시킨 미술관', pos:'50% 50%', g:'exp', src:'https://commons.wikimedia.org/wiki/File:Les_Poissons_rouges,_par_Henri_Matisse.jpg',
    story:['둥근 어항 속 금붕어 네 마리를 꽃과 잎이 둘러싸고 있어요.', '마티스는 금붕어를 여러 번 그렸어요. 바라보는 것만으로 마음이 쉬어 가는 장면을 좋아했어요.'] },
  { id:'wmmatec0a94', t:'붉은 화실', te:'The Red Studio', a:'앙리 마티스', as:'마티스', y:'1911', m:'뉴욕 현대미술관', pos:'50% 50%', g:'exp', src:'https://commons.wikimedia.org/wiki/File:L\'Atelier_rouge,_par_Henri_Matisse.jpg',
    story:['파리 근교 이시레물리노의 작업실을 온통 빨간색으로 칠해 버렸어요.', '벽과 바닥과 가구가 빨강 속에 녹아들고, 그의 작품들만 작게 떠 있어요. 지금은 현대미술의 중요한 그림으로 꼽혀요.'] },
  { id:'wmmat058947', t:'노트르담의 풍경', te:'View of Notre-Dame', a:'앙리 마티스', as:'마티스', y:'1914', m:'뉴욕 현대미술관', pos:'50% 50%', g:'exp', src:'https://commons.wikimedia.org/wiki/File:Henri_Matisse_-_View_of_Notre_Dame._Paris,_quai_Saint-Michel,_spring_1914.jpg',
    story:['센강 변 작업실 창으로 보이던 노트르담 대성당을 그렸어요.', '건물은 몇 개의 선과 푸른 색면으로만 남았어요. 마티스가 추상에 가장 가까이 갔던 그림 가운데 하나예요.'] },
  { id:'wmmat319f53', t:'콜리우르의 풍경', te:'Landscape at Collioure', a:'앙리 마티스', as:'마티스', y:'1905', m:'뉴욕 현대미술관', pos:'50% 50%', g:'exp', src:'https://commons.wikimedia.org/wiki/File:Henri_Matisse_-_Landscape_at_Collioure_-_1905.jpg',
    story:['콜리우르에서 그린 작은 풍경으로, 대작 「삶의 기쁨」을 위한 습작이에요.', '나무와 언덕이 분홍, 초록, 주황의 짧은 붓질로 춤추듯 흩어져요.'] },
  { id:'wmmat55eedb', t:'모로코 사람들', te:'The Moroccans', a:'앙리 마티스', as:'마티스', y:'1915–16', m:'뉴욕 현대미술관', pos:'50% 50%', g:'exp', src:'https://commons.wikimedia.org/wiki/File:Henri_Matisse,_1915-16,_The_Moroccans,_oil_on_canvas,_181.3_x_279.4_cm,_Museum_of_Modern_Art.jpg',
    story:['1912년과 이듬해 모로코를 여행한 기억으로 그린 그림이에요.', '마티스는 검정도 빛나는 색이 될 수 있다고 믿었어요. 넓은 검정 위로 건물과 과일과 사람들이 떠올라요.'] },
  { id:'wmmat95fda6', t:'피아노 레슨', te:'Piano Lesson', a:'앙리 마티스', as:'마티스', y:'1916', m:'뉴욕 현대미술관', pos:'50% 50%', g:'exp', src:'https://commons.wikimedia.org/wiki/File:La_Leçon_de_piano,_par_Henri_Matisse.jpg',
    story:['피아노 앞에 앉은 아들 피에르를 그렸어요. 뒤쪽 벽엔 높은 의자에 앉은 여인을 그린 마티스 자신의 그림이 걸려 있어요.', '창밖 정원은 초록 삼각형 하나로, 메트로놈은 작은 피라미드로 남았어요. 연습 시간의 고요함이 느껴져요.'] },
  { id:'wmmatacf404', t:'테라스의 조라', te:'Zorah on the Terrace', a:'앙리 마티스', as:'마티스', y:'1912', m:'푸시킨 미술관', pos:'50% 50%', g:'exp', src:'https://commons.wikimedia.org/wiki/File:Zorah_sur_la_terrasse,_par_Henri_Matisse.jpg',
    story:['모로코 탕헤르에서 만난 소녀 조라를 그렸어요.', '창 너머 풍경, 성문 그림과 함께 세 폭으로 이어지는 「모로코 삼면화」 중 한 점이에요.'] },
  { id:'wmmatcb0b11', t:'정원의 차', te:'Tea in the Garden', a:'앙리 마티스', as:'마티스', y:'1919', m:'LA 카운티 미술관', pos:'50% 50%', g:'exp', src:'https://commons.wikimedia.org/wiki/File:Le_Thé_dans_le_jardin,_par_Henri_Matisse.jpg',
    story:['이시레물리노 집 정원에서 차를 마시는 오후예요. 딸 마르그리트와 손님, 강아지가 보여요.', '1차 세계대전이 끝난 이듬해, 나무 그늘 아래 평범한 오후가 더 소중하게 느껴져요.'] },
  { id:'wmmat5c630b', t:'제라늄이 있는 정물', te:'Still Life with Geraniums', a:'앙리 마티스', as:'마티스', y:'1910', m:'피나코테크 데어 모데르네', pos:'50% 50%', g:'exp', src:'https://commons.wikimedia.org/wiki/File:Matisse_-_Still_life_with_geraniums_-_with_frame.jpg',
    story:['제라늄 화분과 푸른 무늬 천을 그린 정물이에요.', '마티스는 무늬 있는 천을 무척 아꼈어요. 같은 천을 여러 그림에 거듭 등장시켰어요.'] },
  { id:'wmmat87afa3', t:'푸른 창', te:'The Blue Window', a:'앙리 마티스', as:'마티스', y:'1913', m:'뉴욕 현대미술관', pos:'50% 50%', g:'exp', src:'https://commons.wikimedia.org/wiki/File:Henri_Matisse,_1913,_La_glace_sans_tain_(The_Blue_Window),_oil_on_canvas,_130.8_x_90.5_cm,_Museum_of_Modern_Art.jpg',
    story:['이시레물리노 집 침실 창밖으로 보이는 정원을 그렸어요.', '창턱의 물건과 바깥 나무가 같은 파랑 속에 놓여, 안과 밖의 경계가 사라져요.'] },
  { id:'wmmatc22a6d', t:'조롱박이 있는 정물', te:'Still Life with Gourds', a:'앙리 마티스', as:'마티스', y:'1916', m:'반스 재단', pos:'50% 50%', g:'exp', src:'https://commons.wikimedia.org/wiki/File:Henri_Matisse,_1916,_Still_Life_with_Gourds_(Nature_morte_aux_coloquintes),_oil_on_canvas,_100_x_81.3_cm,_Barnes_Foundation.jpg',
    story:['검은 바탕 위에 조롱박과 화병을 그린 정물이에요.', '전쟁 중의 마티스는 검정을 자주 썼어요. 단순한 형태가 검정 위에서 더 또렷해져요.'] },
  /*MORE-END*/
];

const CATS = [
  { k:'위로', e:'🫶', d:'지친 날 기대고 싶은 말' },
  { k:'용기', e:'💪', d:'한 걸음 내딛게 하는 말' },
  { k:'감사', e:'🙏', d:'작은 것을 알아차리는 말' },
  { k:'웃음', e:'😄', d:'피식 웃게 되는 말' },
  { k:'정보', e:'💡', d:'그림과 화가 이야기 한 토막' },
];

const TASTES = [
  { k:'imp', t:'인상주의', d:'고흐 · 모네', img:'lilies' },
  { k:'east', t:'동양 목판화', d:'호쿠사이', img:'wave' },
  { k:'exp', t:'표현과 감정', d:'뭉크 · 마티스 · 터너', img:'scream' },
  { k:'abs', t:'추상', d:'칸딘스키 · 피카비아', img:'kandinsky' },
];

const POOL = [
  { c:'위로', t:'오늘 못 한 일은, 내일의 내가 할 수 있게 남겨 둔 몫이에요.' },
  { c:'위로', t:'쉬어 가는 것도 하루를 잘 보내는 방법이에요.' },
  { c:'위로', t:'완벽하지 않아도 괜찮아요. 오늘도 충분히 애썼어요.' },
  { c:'용기', t:'처음은 원래 서툴러요. 서툰 걸음도 걸음이에요.' },
  { c:'용기', t:'큰 그림도 첫 붓질 하나에서 시작해요.' },
  { c:'용기', t:'나는 내가 생각하는 것보다 단단한 사람이에요.' },
  { c:'감사', t:'따뜻한 물 한 잔, 오늘의 작은 고마움을 알아차려요.' },
  { c:'감사', t:'곁에 있는 사람에게 오늘 한 번 더 웃어 줘요.' },
  { c:'감사', t:'오늘 하루를 버텨 준 내 몸에게 고마워요.' },
  { c:'웃음', t:'커피는 이미 마셨어요. 이제 나만 깨어나면 돼요.' },
  { c:'웃음', t:'물 한 모금 마시면, 오늘의 걸작이 완성돼요.' },
  { c:'웃음', t:'오늘의 목표: 누워 있기 장인보다 조금만 더 움직이기.' },
  { c:'정보', t:'호쿠사이는 평생 아흔 번 넘게 이사했대요. 새로운 시작은 언제든 괜찮아요.' },
  { c:'정보', t:'고흐는 10년 남짓한 동안 2,000점이 넘는 작품을 남겼어요. 꾸준함이 쌓이면 이렇게 돼요.' },
  { c:'정보', t:'모네의 지베르니 정원은 지금도 해마다 봄부터 가을까지 문을 열어요.' },
  { c:'정보', t:'칸딘스키는 서른 살에 법학자의 길을 접고 그림을 시작했어요. 늦은 시작은 없어요.' },
];

const ARTISTS = {
  '빈센트 반 고흐': { en:'Vincent van Gogh', nat:'네덜란드', life:'1853–1890', bio:[
    '스물일곱 살에 화가가 되기로 마음먹고, 약 10년 동안 2,000점이 넘는 작품을 남겼어요.',
    '파리에서 인상주의를 만난 뒤 남프랑스 아를과 생레미에서 강렬한 색과 소용돌이치는 붓질을 완성했어요. 동생 테오와 주고받은 편지 수백 통이 지금도 남아 있어요.'] },
  '클로드 모네': { en:'Claude Monet', nat:'프랑스', life:'1840–1926', bio:[
    '그의 그림 「인상, 해돋이」가 ‘인상주의’라는 이름이 생긴 계기가 됐어요.',
    '건초더미, 루앙 대성당처럼 같은 대상을 시간과 날씨를 바꿔 가며 연작으로 그렸고, 말년에는 지베르니 정원의 수련에 몰두했어요.'] },
  '가쓰시카 호쿠사이': { en:'Katsushika Hokusai', nat:'일본', life:'1760–1849', bio:[
    '에도 시대의 목판화가로, 평생 3만 점이 넘는 작품을 남겼다고 전해져요.',
    '대표작 「후가쿠 36경」을 70대에 내놓았어요. 아흔 번 넘게 이사하고, 쓰던 이름도 서른 번 넘게 바꿨대요.'] },
  '에드바르 뭉크': { en:'Edvard Munch', nat:'노르웨이', life:'1863–1944', bio:[
    '어린 시절 어머니와 누나를 병으로 잃은 경험이 불안과 사랑, 죽음을 다룬 그림으로 이어졌어요.',
    '「절규」를 포함한 연작 「생의 프리즈」로 표현주의의 선구자가 됐어요.'] },
  '윌리엄 터너': { en:'J. M. W. Turner', nat:'영국', life:'1775–1851', bio:[
    '열네 살에 왕립 미술원 학교에 들어갔고, 평생 바다와 폭풍, 빛을 그려 ‘빛의 화가’로 불려요.',
    '남긴 작품 수천 점을 나라에 기증했어요. 영국의 현대미술상 ‘터너상’이 그의 이름에서 왔어요.'] },
  '바실리 칸딘스키': { en:'Wassily Kandinsky', nat:'러시아', life:'1866–1944', bio:[
    '서른 살에 법학 교수 자리를 마다하고 그림을 시작했어요.',
    '형태를 그리지 않는 추상화를 처음 시도한 화가 가운데 한 명이에요. 색과 음악의 관계를 다룬 책을 썼고, 바우하우스에서 학생들을 가르쳤어요.'] },
  '앙리 마티스': { en:'Henri Matisse', nat:'프랑스', life:'1869–1954', bio:[
    '법률사무소에서 일하다가, 병으로 누워 있을 때 어머니가 건넨 물감으로 그림을 시작했어요.',
    '야수파를 이끌었고, 말년에 몸이 불편해지자 색종이를 가위로 오려 붙이는 작품으로 새로운 길을 열었어요.'] },
  '프랑시스 피카비아': { en:'Francis Picabia', nat:'프랑스', life:'1879–1953', bio:[
    '인상주의풍 그림으로 시작해 입체주의, 추상, 다다로 쉬지 않고 스타일을 바꾼 화가예요.',
    '1913년 뉴욕 아모리 쇼에 참여해 미국에 유럽의 새로운 미술을 알렸고, 다다 운동의 중심 인물이 됐어요.'] },
};

/*LINES-START*/
// 작품별 한마디 5개 (구글 시트 「작품」 탭 F~J열과 같아요): [이야기, 관찰, 위로, 웃음, 하루상식]
const LINES = {
"starry": [
"살아 있는 동안 팔린 유화는 한 점뿐이었대요. 아무도 몰라줘도, 하는 일의 가치는 사라지지 않아요.",
"소용돌이치는 하늘 아래, 작은 교회 첨탑을 찾아보세요.",
"깜깜한 밤에도 별은 저마다 반짝여요. 오늘 밤도 무사히 지나갈 거예요.",
"하늘이 이렇게 빙글빙글 도는 밤엔, 커피는 그만 마셔도 될 것 같아요.",
"창밖에 없던 마을과 교회 첨탑은 고흐가 기억과 상상으로 더했대요."
],
"cafe": [
"밤샘은 명작을 남길 때만 하기로 해요. 오늘은 일찍 자요.",
"붉은 벽과 초록 천장이 서로 부딪치는 색을 느껴 보세요.",
"늦은 밤 불 켜진 곳이 있다는 것만으로도 조금 안심이 돼요.",
"이 카페엔 문 닫는 시간이 없었대요. 그래도 우리는 오늘 문 닫고 쉬어요.",
"아를의 라마르틴 광장에 있던 밤샘 카페를 그린 그림이에요."
],
"olive": [
"같은 길을 매일 걸어도, 매일 조금씩 다른 빛을 만나요.",
"구불구불한 올리브 나무 사이로 스며드는 빛을 따라가 보세요.",
"어제와 같은 하루 같아도, 오늘의 빛은 처음 오는 빛이에요.",
"같은 숲을 열다섯 번 넘게 그렸대요. 올리브 나무도 포즈가 꽤 익숙했겠죠.",
"생레미 시절 고흐는 올리브 숲을 열다섯 점 넘게 그렸어요."
],
"vgself": [
"화랑 직원, 교사, 서점 직원, 전도사. 빈센트는 스물일곱에야 붓을 들었어요. 길을 바꾸는 건 늦은 게 아니에요.",
"짧은 붓질이 촘촘히 겹친 얼굴과 밀짚모자를 가까이 들여다보세요.",
"거울 속 나를 오래 바라봐 주는 것도 나를 아끼는 방법이에요.",
"모델 부를 돈이 없으면 거울을 보면 돼요. 약속 시간 한 번 안 어기는 모델이죠.",
"파리에서 지낸 2년 동안 고흐는 자화상을 스무 점 넘게 그렸어요."
],
"wheat": [
"햇살과 바람이 밀을 익게 하듯, 오늘 나를 키운 작은 것들에게 고마워요.",
"밀밭 위로 불꽃처럼 솟은 사이프러스를 찾아보세요.",
"넓은 밀밭처럼, 오늘은 마음도 조금 느긋하게 펼쳐 둬요.",
"한 점은 들판에서, 두 점은 작업실에서. 고흐도 실내가 편한 날이 있었나 봐요.",
"고흐는 편지에서 사이프러스가 이집트의 오벨리스크처럼 아름답다고 적었어요."
],
"met436524": [
"사람들이 '반 고흐'를 제대로 못 불러서, 그는 그림에 '빈센트'라고만 서명했어요. 오늘은 나를 내 이름으로 불러 줘요.",
"바닥에 나란히 누운 해바라기 두 송이를 들여다보세요.",
"꺾여 누워 있어도 해바라기는 노란빛 그대로예요. 쉬는 날의 나도 그대로 나예요.",
"꽃병 없이 바닥에 누운 해바라기, 오늘은 꽃들도 쉬는 날인가 봐요.",
"아를의 해바라기 연작보다 앞서, 파리 시절 1887년 여름에 그린 해바라기예요."
],
"met436525": [
"들꽃과 정원 꽃을 한데 모아 그렸어요. 서로 달라도 함께 있으면 더 풍성해요.",
"화면을 꽉 채운 꽃다발 속에서 들꽃 한 송이를 골라 보세요.",
"꽃이 가득한 화면처럼, 오늘 하루도 작은 기쁨으로 채워지길 바라요.",
"꽃이 너무 많아서 꽃병이 좀 숨차 보여요. 우리 마음엔 여유를 둬요.",
"프랑스 오베르쉬르우아즈에서 그린 것으로 알려진 꽃 정물이에요."
],
"met436526": [
"빈센트는 존경하던 밀레를 \"스승\"처럼 여기며 그의 그림을 여러 번 따라 그렸어요. 좋아하는 걸 따라 해 보는 것도 훌륭한 연습이에요.",
"아기의 등을 받쳐 주는 엄마의 손을 따라가 보세요.",
"첫걸음은 누구나 비틀거려요. 뒤에서 받쳐 주는 손이 있다는 걸 기억해요.",
"아빠는 기다리고, 아기는 망설이고. 첫걸음엔 원래 용기가 좀 필요하죠.",
"고흐는 밀레의 그림을 사진으로 받아 자기 색으로 다시 그렸어요."
],
"met436527": [
"봄 햇살을 찾아 아를에 도착한 날, 그곳엔 눈이 쌓여 있었대요. 기대와 다른 시작이어도 꽃은 피어요.",
"가지마다 막 피어난 꽃송이를 찾아보세요.",
"봄은 짧아도 해마다 다시 와요. 오늘 놓친 것도 다시 만날 거예요.",
"꽃이 지기 전에 다 그리려고 서둘렀대요. 마감에 쫓기는 건 고흐도 같았네요.",
"1888년 봄 아를에서, 고흐는 한 달 남짓 동안 과수원 그림을 열 점 넘게 그렸어요."
],
"met436528": [
"어린 빈센트는 곤충 이름을 다 외울 만큼 들여다보는 걸 좋아했대요. 오늘은 작은 것 하나를 오래 바라봐요.",
"하얗게 보이는 배경이 원래는 분홍빛이었다고 상상하며 바라보세요.",
"색이 조금 바래도 붓꽃은 여전히 아름다워요. 시간이 지나도 나는 나예요.",
"분홍 배경이 세월 따라 하얘졌대요. 그림도 나이 들면 머리가 세나 봐요.",
"1890년 5월, 생레미를 떠나기 직전에 그린 붓꽃 정물이에요."
],
"met436529": [
"빈센트를 세상에 알린 건 테오의 아내 요한나였어요. 누군가의 진가를 알아봐 주는 사람도 위대해요.",
"책을 앞에 두고 턱을 괸 손을 가만히 바라보세요.",
"조용히 생각에 잠기는 시간도 하루에 꼭 필요해요.",
"한 시간 만에 완성된 초상이래요. 지누 부인 턱이 덜 저렸겠어요.",
"고흐는 지누 부인을 한 시간 만에 그려 냈다고 편지에 적었어요."
],
"met436530": [
"활짝 핀 꽃 옆에 『삶의 기쁨』이라는 책을 두었어요. 오늘 곁에 있는 작은 기쁨을 찾아봐요.",
"탁자 위에 놓인 노란 책을 찾아보세요.",
"꽃은 서두르지 않고 제때 활짝 펴요. 오늘의 당신도 그래요.",
"꽃이 이렇게 활짝 피었으니, 책은 잠깐 덮어 둬도 되겠죠?",
"탁자 위 노란 책은 에밀 졸라의 소설 『삶의 기쁨』이에요."
],
"met436531": [
"어두운 갈색으로 그리던 고흐는 몇 년 뒤 전혀 다른 색을 만나요. 지금의 색이 끝이 아니에요.",
"어두운 화면 속에서 난롯가의 작은 불빛을 찾아보세요.",
"난롯가의 온기처럼, 오늘 저녁엔 따뜻한 것 한 그릇 챙겨 먹어요.",
"난롯가에서 요리할 땐 딴짓 금지예요. 오늘 저녁은 뭐 해 먹을까요?",
"네덜란드 누에넌 시절 그림이에요. 이 무렵 고흐 그림은 어두운 갈색 톤이 특징이에요."
],
"met436533": [
"닳은 신발 한 켤레가 신은 사람의 하루를 대신 말해 줘요. 오늘 내 걸음도 다 의미가 있어요.",
"닳고 해진 신발의 주름을 하나씩 따라가 보세요.",
"닳은 신발은 그만큼 열심히 걸었다는 뜻이에요. 오늘도 충분히 애썼어요.",
"주인 대신 모델이 된 신발이에요. 신발도 하루쯤은 주인공이 될 수 있죠.",
"고흐는 낡은 신발을 여러 번 그렸어요. 이 그림은 1888년 아를에서 그렸어요."
],
"met436534": [
"조카가 태어났다는 소식에 빈센트는 꽃 피는 나무 그림을 선물했어요. 누군가의 새 시작을 축하하는 마음은 오래 남아요.",
"하얀 장미처럼 보이는 꽃송이들이 원래 분홍빛이었다고 떠올리며 봐요.",
"빛이 바래도 아름다움은 다른 모습으로 남아요. 오늘의 나도 그래요.",
"원래는 분홍 장미였대요. 세월이 지나니 장미도 화장을 지웠나 봐요.",
"같은 시기에 그린 「붓꽃」과 짝을 이루는 장미 정물이에요."
],
"met436536": [
"고흐는 이 그림을 어머니와 누이에게 주려고 다시 그렸어요. 오늘은 가족에게 안부를 전해 봐요.",
"올리브 나무 아래에서 열매를 따는 여인들의 손을 따라가 보세요.",
"함께 거두는 손길이 있으면 겨울도 덜 춥게 느껴져요.",
"올리브 따기는 팀플레이예요. 오늘 내 일도 누가 좀 거들어 주면 좋겠네요.",
"1889년 겨울 생레미에서 그렸어요. 고흐는 이 구도로 여러 점을 남겼어요."
],
"met437980": [
"가까이서 보면 두꺼운 붓 자국이 그대로 살아 있어요. 애쓴 흔적은 그 자체로 아름다워요.",
"하늘로 치솟는 나무의 두꺼운 붓 자국을 가까이 들여다보세요.",
"불꽃처럼 일렁여도 나무는 그 자리에 서 있어요. 흔들려도 괜찮아요.",
"이 사이프러스, 가만히 서 있는 법을 모르나 봐요. 월요일의 나처럼요.",
"1889년 6월 생레미에서 그렸어요. 물감을 두껍게 올린 붓 자국이 특징이에요."
],
"met437984": [
"거친 바다의 뱃사람들이 이 그림으로 위안을 얻길 바랐대요. 오늘은 이 그림이 당신의 자장가예요.",
"요람 끈을 쥐고 앉아 있는 오귀스틴의 손을 바라보세요.",
"거친 하루를 보냈다면, 이제 요람처럼 천천히 흔들리며 쉬어 가요.",
"같은 그림을 다섯 번 그렸대요. 자장가는 원래 여러 번 불러야 잠이 오죠.",
"고흐는 우체부 룰랭의 아내 오귀스틴을 그린 이 그림을 다섯 번 그렸어요."
],
"met459123": [
"빈센트와 테오는 18년 동안 편지를 600통 넘게 주고받았어요. 오늘 떠오르는 사람에게 짧은 안부를 보내 봐요.",
"엄마 품에 안긴 막내 마르셀을 바라보세요.",
"낯선 곳에서도 따뜻한 이웃은 생겨요. 당신 곁에도 그런 사람이 있을 거예요.",
"룰랭 가족은 아기까지 한 명도 빠짐없이 그려졌대요. 마르셀은 모델 데뷔가 빨랐네요.",
"고흐는 아를에서 친하게 지낸 룰랭 가족 한 사람 한 사람을 모두 그렸어요."
],
"met438722": [
"캔버스 살 돈이 모자라면 쓰던 그림의 뒷면에 또 그렸어요. 다시 쓰는 것도 새로 시작하는 방법이에요.",
"감자를 깎는 아낙의 손끝에 시선을 머물러 보세요.",
"평범한 일상도 그림이 될 만큼 소중해요. 오늘 하루도 그래요.",
"앞면엔 감자 깎는 아낙, 뒷면엔 밀짚모자 쓴 고흐. 한 캔버스에 두 사람이 사네요.",
"이 캔버스 뒷면에는 2년 뒤 파리에서 그린 「밀짚모자를 쓴 자화상」이 있어요."
],
"lilies": [
"흐릿한 날에도 꽃은 피어요. 선명하지 않아도 괜찮아요.",
"연못 위에 떠 있는 수련 잎과 꽃을 하나씩 찾아보세요.",
"물 위에 가만히 떠 있는 수련처럼, 오늘은 힘을 조금 빼도 괜찮아요.",
"수련만 250점 가까이 그렸대요. 연못도 이쯤이면 모네 얼굴을 다 외웠겠어요.",
"모네는 말년의 30년 가까이 지베르니 연못의 수련을 250점 가까이 그렸어요."
],
"wmmon4e12b1": [
"모네는 언덕 위 아내와 아들을 올려다보며 그렸어요. 오늘은 가까운 사람을 한 번 더 바라봐요.",
"바람에 날리는 베일 끝을 따라가 보세요.",
"바람이 불어도 햇살은 그대로예요. 오늘도 당신 곁엔 따뜻한 빛이 있어요.",
"이 그림 앞에선 괜히 머리를 정리하고 싶어져요. 바람이 진짜 부는 것 같거든요.",
"아르장퇴유의 언덕에서 아내 카미유와 아들 장을 그린 그림이에요."
],
"wmmon3100be": [
"모네는 역의 허락을 받고 역 안에서 그렸어요. 해 보고 싶은 일은 먼저 물어보는 데서 시작돼요.",
"유리 지붕 아래로 피어오르는 기차의 증기를 바라보세요.",
"자욱한 증기 속에서도 기차는 제 길을 따라 도착해요. 오늘 당신도 그럴 거예요.",
"역에서만 열두 점 가까이 그렸대요. 웬만한 통근객보다 역에 자주 왔겠어요.",
"모네는 파리 생라자르 역 안에서 열두 점 가까운 연작을 그렸어요."
],
"wmmon1674ba": [
"모네는 런던의 안개를 가장 사랑했대요. 흐린 날에도 아름다운 순간은 있어요.",
"안개 너머로 비치는 햇빛과 국회의사당의 윤곽을 찾아보세요.",
"안개가 짙어도 해는 그 너머에 있어요. 조금만 기다려 봐요.",
"다들 런던 안개를 탓할 때, 모네는 그 안개에 반했대요. 취향은 존중해요.",
"모네는 템스강 건너편 병원 테라스에서 국회의사당을 수십 번 그렸어요."
],
"wmmonfb9f17": [
"같은 대성당도 아침과 해 질 녘엔 다른 색이 돼요. 시간마다 다른 나여도 괜찮아요.",
"햇빛에 물든 대성당 서쪽 정면의 색을 가만히 바라보세요.",
"어떤 빛 아래에 있든, 당신은 그대로 아름다워요.",
"대성당 맞은편에 방까지 빌렸대요. 성당 입장에선 꽤 열성적인 팬이었겠어요.",
"모네는 루앙 대성당을 시간과 날씨를 바꿔 가며 30점 넘게 그렸어요."
],
"wmmonfd436e": [
"모네는 같은 건초더미를 25점 넘게 그렸어요. 평범한 것도 오래 보면 특별해져요.",
"눈 위에 드리운 그림자 속 파랑과 분홍을 찾아보세요.",
"추운 겨울에도 낮은 해는 들판을 비춰요. 오늘도 따뜻한 빛이 닿을 거예요.",
"건초더미가 이렇게 유명해질 줄, 건초더미 본인도 몰랐을 거예요.",
"모네는 지베르니 집 근처 건초더미를 계절과 시간을 바꿔 가며 25점 넘게 그렸어요."
],
"wmmone5f19b": [
"베어질 나무를 다 그릴 때까지 사 두었대요. 아끼는 것은 지킬 방법을 찾아봐요.",
"물에 비친 포플러 그림자가 만드는 세로줄 리듬을 따라가 보세요.",
"나란히 선 나무들처럼, 당신 곁에도 함께 서 있는 사람이 있어요.",
"그림을 끝내려고 나무를 사 버렸대요. 마감을 지키는 가장 통 큰 방법이네요.",
"엡트 강가의 포플러가 베어질 위기에 처하자, 모네는 다 그릴 때까지 나무를 사 두었어요."
],
"wmmon19aa12": [
"눈이 흐려진 뒤에도 모네는 이 다리를 다시 그렸어요. 선명하지 않아도 계속하는 마음이 아름다워요.",
"붉고 노란 색 덩어리 사이에서 다리의 흔적을 찾아보세요.",
"모든 게 또렷하지 않아도 괜찮아요. 색은 여전히 따뜻해요.",
"다리를 찾다 보면 숨은그림찾기가 돼요. 찾았다면 오늘 운이 좋은 거예요.",
"말년에 그린 이 다리 그림은 형태가 거의 사라져 추상화에 가까워요."
],
"wmmon30d1e3": [
"살롱전에서 떨어졌던 그림이 지금은 대표작이 됐어요. 오늘의 결과가 마지막 답은 아니에요.",
"울타리 위에 앉은 까치 한 마리를 찾아보세요.",
"눈 내린 아침처럼 조용한 시작도 괜찮아요. 천천히 하루를 열어요.",
"넓은 눈밭의 주인공 자리를 까치가 차지했어요. 작아도 존재감은 확실하죠.",
"1869년 살롱전에서 떨어졌던 그림이에요. 지금은 눈 그림자의 푸른빛으로 유명해요."
],
"wmmond0be2b": [
"모네는 이사한 마을의 풍경을 평생 그렸어요. 내가 사는 동네에도 그릴 만한 풍경이 있어요.",
"움푹한 들판을 가득 채운 붉은 양귀비를 바라보세요.",
"붉은 꽃이 들판을 채우듯, 오늘 하루에도 작은 기쁨이 피어날 거예요.",
"이사 오자마자 동네 꽃밭부터 그렸대요. 모네식 집들이였나 봐요.",
"모네가 지베르니로 이사한 뒤 집 근처 들판의 양귀비를 그린 그림이에요."
],
"wmmon882481": [
"모네 가족이 여름을 보내던 바닷가예요. 오늘은 좋아하는 여름 기억 하나를 꺼내 봐요.",
"모래 위에 끌어올린 배와 바다 위 돛단배들을 번갈아 보세요.",
"바닷가의 밝은 여름처럼, 당신 마음에도 볕 드는 자리가 있어요.",
"배도 모래 위에서 쉬는 날이 있어요. 오늘은 나도 잠깐 정박해 볼까요?",
"생타드레스는 노르망디 르아브르 근처에 있는 바닷가예요."
],
"wmmon7e6f48": [
"가까이서 보면 색 조각, 멀리서 보면 반짝이는 물이에요. 고민도 한 걸음 물러서서 봐요.",
"물에 비친 돛과 집들의 색 조각을 찾아보세요.",
"흔들리는 물결 위에서도 빛은 반짝여요. 오늘의 당신도 그래요.",
"굵은 붓질 몇 번으로 툭툭. 모네의 손이 요트보다 빨랐을지도 몰라요.",
"파리 근교 아르장퇴유의 센강에서 열린 요트 경주를 그린 그림이에요."
],
"wmmon08136a": [
"비평가들이 혀를 찼던 점들이 지금은 도시의 활기가 됐어요. 남다른 시도는 시간이 알아봐 줘요.",
"길을 걷는 사람들이 점처럼 찍힌 거리를 내려다보세요.",
"북적이는 거리의 작은 점 하나도 저마다의 하루를 살고 있어요. 당신도요.",
"위에서 내려다보면 다들 작은 점이에요. 오늘 고민도 그만큼 작아지면 좋겠어요.",
"1874년 첫 인상파 전시는 이 풍경을 내려다본 나다르의 작업실 건물에서 열렸어요."
],
"wmmon682ca0": [
"점심을 마친 뒤의 한가한 오후를 그렸어요. 오늘도 밥 먹고 잠깐 쉬어 가요.",
"그늘에서 혼자 노는 아이와 걸어 둔 모자를 찾아보세요.",
"남은 음식, 걸어 둔 모자. 이런 느긋한 오후가 당신에게도 오길 바라요.",
"식탁에 아직 음식이 남았어요. 디저트 배는 따로 있었나 봐요.",
"아르장퇴유 집 정원에서 점심을 마친 뒤의 오후를 그린 그림이에요."
],
"wmmon748789": [
"계획은 실현되지 않았지만 등나무 그림은 남았어요. 이루지 못한 계획도 무언가를 남겨요.",
"늘어진 보랏빛 꽃송이를 위에서 아래로 따라가 보세요.",
"아래로 늘어진 꽃송이처럼, 오늘은 어깨에 힘을 빼고 쉬어요.",
"그림인데 향기가 나는 것 같아요. 그래도 휴대폰에 코를 대진 마세요.",
"모네가 말년에 대형 수련 장식화 위를 두르려고 그린 등나무 그림이에요."
],
"wmmonbb5a9d": [
"모네는 정원을 직접 가꿨어요. 오늘은 내 곁의 작은 것 하나를 돌봐 줘요.",
"아래에서 올려다본 노란 붓꽃의 꽃잎을 바라보세요.",
"올려다보면 작은 꽃도 크게 보여요. 오늘은 고개를 한 번 들어 봐요.",
"꽃 앞에 쪼그려 앉은 모네를 상상해 보세요. 붓꽃이 좀 쑥스러웠겠죠.",
"지베르니 정원의 연못가에 핀 노란 붓꽃을 그린 그림이에요."
],
"wmmon796146": [
"안개와 연기가 섞이자 다리가 물 위에 뜬 것처럼 보였어요. 흐릿함이 만드는 아름다움도 있어요.",
"안개 속 다리 위를 지나는 기차의 연기를 찾아보세요.",
"안개가 짙어도 다리는 그 자리에 있어요. 당신의 길도 그래요.",
"다리가 물 위에 둥둥 떠 보여요. 런던 안개는 마술도 부리나 봐요.",
"모네의 런던 연작 가운데 하나로, 안개 속 채링크로스 다리를 그렸어요."
],
"wmmona4847e": [
"모네는 베네치아에서 그린 그림을 몇 년에 걸쳐 마무리했어요. 천천히 완성해도 괜찮아요.",
"물 위에 떠 있는 듯한 궁전의 윤곽을 바라보세요.",
"한 번뿐인 여행도 오래 마음에 남아요. 좋은 기억은 천천히 꺼내 봐요.",
"여행 다녀와서 몇 년 동안 마무리했대요. 여행 사진 정리 미룬 것도 괜찮아요.",
"1908년, 모네는 처음이자 마지막으로 베네치아를 여행했어요."
],
"wmmon78acd7": [
"모네도 남쪽 햇빛의 색은 담기 어렵다고 털어놓았어요. 어려운 건 어렵다고 말해도 돼요.",
"강렬한 남쪽 햇빛을 받은 별장들의 색을 바라보세요.",
"낯선 곳의 빛은 처음엔 눈부셔요. 천천히 익숙해지면 돼요.",
"햇빛이 너무 강해서 고민이라니, 화가다운 행복한 고민이에요.",
"1884년 이탈리아 리비에라의 보르디게라에서 그린 그림이에요."
],
"wmmona8d6f1": [
"탁 트인 하늘이 화면 대부분을 채워요. 오늘은 잠깐 하늘을 올려다봐요.",
"절벽 위를 나란히 걷는 두 여인을 찾아보세요.",
"바람에 흔들리는 풀처럼, 오늘은 조금 흔들려도 괜찮아요.",
"바람 부는 절벽 산책이라니, 모자는 꼭 붙잡고 걸어야겠어요.",
"노르망디 바닷가 푸르빌의 절벽 위를 두 여인이 걷는 장면이에요."
],
"wave": [
"파도가 커 보여도, 멀리서 보면 산은 그대로예요.",
"거대한 파도 아래, 작게 앉은 후지산을 찾아보세요.",
"파도는 지나가도 산은 남아요. 오늘 조금 흔들려도 괜찮아요.",
"같은 판으로 수천 장을 찍었대요. 그 시절 파도계의 베스트셀러예요.",
"이 선명한 파랑은 당시 새로 들어온 안료, 프러시안 블루예요."
],
"met36490": [
"단 몇 가지 색으로 이 산을 그렸대요. 오늘도 꼭 필요한 것만 챙겨 봐요.",
"아침 햇빛에 붉게 물든 산비탈을 천천히 올라가 보세요.",
"흐린 날이 길어도, 이렇게 맑게 물드는 아침이 와요.",
"후지산도 아침엔 얼굴이 빨개지나 봐요. 부끄러운 일이라도 있었을까요?",
"「붉은 후지」는 「높은 파도」와 함께 「후가쿠 36경」에서 가장 유명한 장이에요."
],
"met36492": [
"꼭대기는 맑고 아래는 폭풍이래요. 마음 한쪽이 흐려도 다른 쪽은 맑을 수 있어요.",
"산 아래로 내리치는 번개를 찾아보세요.",
"아래가 시끄러워도 위는 고요해요. 잠깐 시선을 위로 올려 봐요.",
"머리는 맑은데 발밑은 천둥 번개. 월요일 아침의 우리 같아요.",
"「붉은 후지」와 같은 구도에 날씨만 바꿔 그린 그림이에요."
],
"met36493": [
"보이지 않는 바람도 흔적을 남겨요. 오늘 당신의 노력도 어딘가에 남고 있어요.",
"하늘로 날아가는 모자와 종이를 따라가 보세요.",
"계획이 바람에 날아가도 괜찮아요. 멀리 산은 그대로 있어요.",
"갑자기 분 바람에 모자가 날아간 나그네, 남 일 같지 않죠?",
"이 그림 속 후지산은 선 하나로만 그려져 있어요."
],
"met36495": [
"호수 속 후지산은 실제와 각도가 달라요. 조금 달라도 그 모습 그대로 아름다워요.",
"호수에 비친 후지산을 보세요. 위의 산과 무엇이 다른가요?",
"남들 눈에 비친 내가 조금 달라도 괜찮아요. 진짜 산은 그대로니까요.",
"호수 속 후지산만 눈을 덮어썼어요. 화가의 귀여운 장난일지도 몰라요.",
"이 그림은 미사카 고개에서 바라본 후지산을 담았어요."
],
"met39656": [
"거센 물살 위에서도 어부는 그물을 던져요. 오늘도 할 수 있는 만큼만 던져 봐요.",
"바위 위 어부의 그물을 따라가 보세요. 그 끝에 후지산이 있어요.",
"물살이 거세도, 발 디딜 바위 하나면 충분해요.",
"오늘은 꼭 월척이 걸리길 바라요. 어부도 우리도요.",
"어부와 파도의 선이 삼각형을 이루고, 그 끝에 후지산이 있어요."
],
"met39798": [
"섬과 사당, 소나무가 조용히 균형을 잡고 있어요. 오늘도 천천히 균형을 찾아봐요.",
"호수 가운데 작은 섬 위의 사당과 소나무를 찾아보세요.",
"잔잔한 호수처럼, 마음도 천천히 가라앉을 거예요.",
"호수 한가운데 섬 하나, 혼자만의 시간이 필요했던 소나무 같아요.",
"호쿠사이는 평생 3만 점이 넘는 작품을 남겼다고 전해져요."
],
"met55289": [
"큰 아치 안에 작은 후지산을 넣었대요. 바쁜 하루 사이에도 작은 기쁨 하나 넣어 봐요.",
"다리의 둥근 아치 아래, 작게 보이는 후지산을 찾아보세요.",
"다리 아래에서도 멀리 산이 보여요. 낮은 자리에서만 보이는 풍경도 있어요.",
"거대한 다리 밑에 쏙 들어간 후지산, 숨바꼭질 중인가 봐요.",
"큰 것과 작은 것을 한 화면에 겹치는 게 호쿠사이의 특기였어요."
],
"met37321": [
"누군가 손끝으로 가리킨 곳에 후지산이 있어요. 오늘 좋은 걸 보면 옆 사람에게도 알려 줘요.",
"손으로 가리키는 사람을 찾고, 그 손끝을 따라가 보세요.",
"높은 데서 멀리 보면, 지금 고민도 조금 작아 보여요.",
"저기 봐, 저기! 몇백 년째 같은 곳을 가리키는 중이에요.",
"고햐쿠라칸지는 에도에 있던 절이에요."
],
"met55237": [
"붐비는 다리 위 대신 강가를 그렸대요. 오늘은 붐비는 곳 말고 한적한 쪽을 봐요.",
"강을 따라 늘어선 창고 끝, 작은 후지산과 에도성을 찾아보세요.",
"북적이는 하루여도, 그 끝에는 고요한 풍경이 기다려요.",
"다리 위는 너무 붐볐나 봐요. 출근길 지하철 같았을까요?",
"니혼바시는 에도에서 전국으로 뻗은 길이 시작되는 다리였어요."
],
"met36508": [
"누군가 쏟은 물 한 번에 백로가 날아올라요. 작은 움직임이 풍경을 바꾸기도 해요.",
"배 위에서 쏟아지는 물과, 놀라 날아오르는 백로들을 보세요.",
"조용한 새벽 공기처럼, 오늘 아침이 당신에게 고요하길 바라요.",
"물 한 바가지에 백로들이 깜짝. 알람 소리에 놀란 우리 같아요.",
"「후가쿠 36경」에서 눈 덮인 겨울 풍경은 드물어요."
],
"met36499": [
"나그네 셋이 팔을 벌려 나무를 재고 있어요. 혼자 안기 벅찬 일은 같이 안아요.",
"삼나무를 둘러싼 나그네들의 팔을 하나씩 세어 보세요.",
"곁에 큰 나무 같은 사람이 있다는 건 참 든든한 일이에요.",
"셋이 손을 맞잡아야 겨우 닿는 나무. 단체 포옹 성공이에요.",
"「후가쿠 36경」은 호쿠사이가 70대에 내놓은 연작이에요."
],
"met55369": [
"말 탄 사람도, 가마꾼도, 짐꾼도 저마다 길을 가요. 오늘은 내 속도로 가도 돼요.",
"소나무 줄기 사이로 보이는 후지산을 찾아보세요.",
"바쁜 길 위에서도 나무 틈으로 산이 보여요. 잠깐 쉬어 가도 돼요.",
"말 탄 사람은 편해 보이고 가마꾼은 바빠 보여요. 오늘 당신은 어느 쪽인가요?",
"호쿠사이는 평생 아흔 번 넘게 이사했대요."
],
"met36489": [
"나무 아치 다섯 개가 이어진 다리예요. 오늘 하루도 한 칸씩 건너가면 돼요.",
"다리를 이루는 다섯 개의 아치를 하나씩 세어 보세요.",
"오래 그 자리를 지켜 온 다리처럼, 당신도 충분히 단단해요.",
"아치 다섯 개를 오르락내리락, 다리만 건너도 운동이 되겠어요.",
"긴타이교는 지금도 이와쿠니, 그 자리에 있어요."
],
"met45026": [
"실제 풍경이 아니라 이야기 속 장소를 그렸대요. 오늘은 좋아하는 이야기 속을 잠깐 걸어 봐요.",
"붓꽃 핀 늪 위로 꺾여 나가는 지그재그 다리를 따라가 보세요.",
"길이 꼬불꼬불해도, 한 걸음씩 가면 건너편에 닿아요.",
"지그재그 다리라니, 빨리 건너긴 글렀어요. 천천히 꽃 구경 하라는 뜻일지도요.",
"야쓰하시는 옛 이야기 『이세 이야기』에 나오는 장소예요."
],
"met55022": [
"깊은 길 끝에서 만나는 폭포예요. 오늘 가는 길 끝에도 좋은 풍경이 있길 바라요.",
"폭포 꼭대기의 둥글게 파인 부분을 보세요.",
"깊은 곳까지 와야 보이는 풍경도 있어요. 지금 그 길 위에 있는지도 몰라요.",
"폭포가 후광까지 둘렀어요. 오늘 좀 멋 부렸나 봐요.",
"폭포 꼭대기가 아미타불의 후광을 닮아 아미다 폭포라는 이름이 붙었어요."
],
"met55019": [
"물줄기도 여러 갈래로 나뉘어 흘러요. 할 일이 많은 날도 하나씩이면 돼요.",
"폭포 앞에서 올려다보는, 아주 작은 순례자들을 찾아보세요.",
"커다란 폭포 앞에 서면 작은 걱정들은 잠시 물소리에 묻혀요.",
"폭포가 나무뿌리처럼 뻗었어요. 물도 가끔은 나무가 되고 싶나 봐요.",
"순례자를 아주 작게 그려서 폭포가 더 커 보이게 했어요."
],
"met45027": [
"호쿠사이는 폭포마다 물 떨어지는 모양을 다르게 그렸대요. 오늘의 나도 어제와 달라도 돼요.",
"폭포의 물이 어떤 모양으로 떨어지는지 천천히 보세요.",
"영웅의 말도 이 물가에서 쉬어 갔대요. 오늘 당신도 잠깐 쉬어 가요.",
"영웅의 말이 몸을 씻던 곳이래요. 그 시절 최고급 세차장이었네요.",
"「제국 폭포 순례」는 모두 여덟 장으로 된 폭포 연작이에요."
],
"met37192": [
"붓꽃 잎 사이에 메뚜기가 숨어 있어요. 오늘도 작은 반가움 하나 찾아봐요.",
"바람에 휜 붓꽃 잎 사이, 숨은 메뚜기를 찾아보세요.",
"바람에 휘어도 붓꽃은 여전히 피어 있어요.",
"메뚜기의 숨바꼭질 실력, 꽤 수준급이에요.",
"이 그림은 꽃과 곤충을 크게 클로즈업한 호쿠사이의 화조 판화예요."
],
"met54306": [
"풍경화로 유명한 호쿠사이도 작은 생명을 섬세하게 봤대요. 오늘 작은 것에 눈길 한 번 줘 봐요.",
"보랏빛 도라지꽃 위를 나는 잠자리를 보세요.",
"작은 날개로도 충분히 날 수 있어요.",
"잠자리가 도라지꽃 위에서 고민 중이에요. 앉을까, 말까.",
"호쿠사이는 평생 쓰던 이름을 서른 번 넘게 바꿨대요."
],
"scream": [
"소리치고 싶은 날도 있어요. 그 마음을 알아차린 것만으로도 잘하고 있어요.",
"붉게 물든 하늘과, 피오르를 따라 이어진 길을 보세요.",
"붉게 일렁이는 하늘도 결국 저물어요. 내일은 또 다른 하늘이 와요.",
"이 표정, 월요일 아침 알람을 들은 우리랑 꽤 닮았어요.",
"「절규」는 그림 두 점, 파스텔 두 점, 그리고 판화로도 만들어졌어요."
],
"wmmun60ff7a": [
"고흐의 그림과 이름은 같지만 훨씬 고요해요. 같은 이름이어도 저마다의 밤이 있어요.",
"물가에 드리운 그림자와 별빛이 어떻게 이어지는지 보세요.",
"조용한 밤에도 별은 떠 있어요. 오늘 밤은 푹 쉬어요.",
"같은 제목, 다른 화가. 별 보기 좋은 밤이 두 군데인 셈이에요.",
"오스고르스트란은 뭉크가 여름마다 지내던 바닷가 마을이에요."
],
"wmmunebca58": [
"실연한 친구를 바닷가의 사람으로 그렸대요. 오늘은 마음 아픈 친구에게 안부 한 줄 보내 봐요.",
"판화 곳곳에 그대로 찍힌 나뭇결을 찾아보세요.",
"쓸쓸한 저녁도 지나가요. 바닷가에 앉은 마음도 언젠가 다시 일어서요.",
"바닷가에 혼자 앉아 생각 중인 사람, 퇴근길 버스 창가의 나 같아요.",
"이 작품은 뭉크가 처음 시도한 목판화 가운데 하나예요."
],
"wmmuncef420": [
"힘든 겨울, 뭉크는 살아 숨 쉬는 사람을 그리기로 마음먹었대요. 오늘 곁의 사람을 한 번 더 봐요.",
"창밖으로 흐르는 센강의 물빛을 따라가 보세요.",
"창밖의 강은 계속 흘러요. 무거운 마음도 천천히 흘러갈 거예요.",
"창밖으로 센강이 보이는 방이라니, 뭉크도 창가 명당을 알았나 봐요.",
"생클루는 뭉크가 1889년 겨울을 보낸 파리 근교 동네예요."
],
"wmmun2604a4": [
"뭉크에게도 이렇게 밝은 날이 있었어요. 오늘은 맑은 쪽을 한 번 바라봐요.",
"맑은 거리를 따라 행진하는 군악대를 찾아보세요.",
"마음이 무거운 날 뒤에도, 음악이 흐르는 맑은 날은 와요.",
"「절규」의 화가가 그린 퍼레이드라니, 반전 매력이에요.",
"카를 요한 거리는 오슬로의 중심 거리예요."
],
"wmmunb6e0b1": [
"서른 남짓의 뭉크는 삶을 늘 깊이 들여다봤대요. 오늘 하루를 조금 더 또렷하게 느껴 봐요.",
"검은 배경 속에서 떠오르는 얼굴을 보세요.",
"어둠 속에서도 얼굴은 또렷이 떠올라요. 당신도 그래요.",
"이렇게 진지한 콘셉트의 셀카라니, 뭉크는 프로필 사진 장인이었어요.",
"이 자화상은 석판화로 만든 작품이에요."
],
"wmmun34ec05": [
"뭉크는 외로운 마음을 숨기지 않고 그렸대요. 오늘 내 마음도 솔직하게 들여다봐요.",
"뒤편에서 등을 돌린 웨이터들을 보세요.",
"북적이는 곳에서 외로운 날도 있어요. 그런 날의 당신도 괜찮아요.",
"웨이터들이 다 등을 돌렸어요. 주문은 언제 받아 줄까요?",
"이 그림은 뭉크의 자화상 가운데 가장 솔직한 작품으로 꼽혀요."
],
"wmmun616ce6": [
"원래 제목은 「사랑과 고통」이었대요. 남이 붙인 이름보다 내 마음이 먼저예요.",
"서로에게 기댄 두 사람의 자세를 보세요.",
"기댈 어깨 하나가 큰 위로가 되기도 해요.",
"위로하는 장면인데 뱀파이어라니, 별명 하나로 인생이 바뀐 그림이에요.",
"「뱀파이어」라는 제목은 한 비평가가 부른 이름에서 시작됐어요."
],
"wmmunecff5c": [
"뭉크는 이 장면을 여러 번 다시 만들었대요. 좋은 순간은 몇 번이고 떠올려도 좋아요.",
"창가에서 하나로 녹아든 두 사람의 얼굴을 보세요.",
"오늘 누군가와 마음이 따뜻하게 닿기를 바라요.",
"얼굴이 하나로 녹아들 정도면, 꽤 오래 붙어 있었나 봐요.",
"「키스」는 그림과 판화로 여러 번 제작됐어요."
],
"wmmun97a11c": [
"혼자가 아니라 여럿이 함께 느끼는 불안을 그렸대요. 불안한 날, 당신만 그런 게 아니에요.",
"붉은 하늘 아래, 다리 위에 줄지어 선 사람들을 보세요.",
"다들 조금씩 불안해요. 그래도 같은 다리 위에 함께 서 있어요.",
"다들 표정이 똑같아요. 회의 시작 직전 같아요.",
"「불안」은 「절규」와 같은 붉은 하늘과 피오르 다리를 배경으로 해요."
],
"wmmund9d021": [
"뭉크는 어른이 되어서도 누나 소피를 기억하며 그렸어요. 그리운 사람을 잠시 떠올려 봐요.",
"방 안에 서 있는 가족들의 모습을 하나씩 천천히 보세요.",
"슬픔은 저마다의 모양으로 와요. 모습은 달라도 모두 같은 사람을 아끼고 있어요.",
"오늘은 보고 싶은 가족에게 안부 한 줄 보내 볼까요? 짧아도 충분해요.",
"이 그림은 뭉크가 어린 시절의 기억을 떠올려 다시 그린 작품이에요."
],
"wmmun9b984c": [
"납작하고 단순하게 그렸더니 동화 같아졌대요. 오늘은 조금 단순하게 가 봐요.",
"나란히 선 네 아이의 모습을 하나씩 보세요.",
"나란히 서 있는 것만으로도 든든한 사이가 있어요.",
"네 자매가 나란히, 단체 사진 찍기 직전 같아요. 누가 눈 감았을까요?",
"그림 속 네 소녀는 오스고르스트란의 네 자매예요."
],
"wmmun801352": [
"그림 밖으로 튀어나올 듯한 속도감이에요. 오늘 하고 싶은 일에 힘껏 달려 봐요.",
"눈 덮인 길가에서 놀라 비켜서는 사람들을 보세요.",
"빠르게 달려오는 일 앞에선 잠깐 비켜서도 괜찮아요.",
"이 정도 속도면 말한테 과속 딱지 하나 끊어야겠어요.",
"뭉크는 연작 「생의 프리즈」로 표현주의의 선구자가 됐어요."
],
"wmmunc55bf9": [
"뭉크는 질투라는 감정을 여러 번 그렸대요. 그런 마음이 드는 것도 사람이라 그래요.",
"창백한 남자 뒤, 정원에 선 한 쌍의 남녀를 보세요.",
"질투가 날 땐, 그만큼 소중한 게 있다는 뜻이기도 해요.",
"뒤에서 무슨 일이 있는지 다 아는 표정이에요. 눈치 백 단이에요.",
"뒤편의 정원 장면은 남자의 마음속처럼 보이도록 그려졌어요."
],
"wmmun2b7e51": [
"설렘과 망설임은 늘 함께 와요. 망설여지는 일이 있다면, 설레는 일이기도 해요.",
"물 위에 비친 달빛 기둥을 찾아보세요.",
"여름밤 달빛처럼, 오늘 밤 마음이 은은하게 밝아지길 바라요.",
"하얀 옷의 여인이 우리를 빤히 봐요. 혹시 휴대폰 너무 오래 본 거 아닐까요?",
"「목소리, 여름밤」은 1896년에 그려졌고, 지금은 뭉크 미술관에 있어요."
],
"wmmunc3826b": [
"말년의 뭉크는 밝은 들판과 일하는 사람을 즐겨 그렸대요. 어두운 시절 뒤에도 환한 날이 와요.",
"들판에서 건초를 베는 남자의 움직임을 따라가 보세요.",
"묵묵히 일하는 하루도 충분히 아름다워요.",
"이렇게 넓은 들판이라니, 오늘 건초 베기 퀘스트는 꽤 길겠어요.",
"그림 속 남자는 오슬로 근교 에켈리의 농장에서 일하던 사람이에요."
],
"wmmun8e4d97": [
"「절규」의 화가가 그린 가장 환한 그림이에요. 어떤 시절 뒤에도 해는 떠요.",
"바위 해안 위로 사방에 퍼지는 햇살을 보세요.",
"오늘 당신에게도 이만큼 환한 빛이 닿길 바라요.",
"해가 이렇게 열심히 빛을 뿜으면, 선크림은 필수예요.",
"이 그림은 오슬로 대학교 강당 벽화의 바탕이 됐어요."
],
"wmmun265e60": [
"일을 마친 사람들이 함께 걸어와요. 오늘 하루 끝에도 같이 걸을 사람이 있길 바라요.",
"화면 밖으로 쏟아져 나오는 듯한 노동자들의 행렬을 보세요.",
"오늘도 수고 많았어요. 돌아가는 길이 가볍길 바라요.",
"퇴근 행렬의 풍경은 옛날이나 지금이나 똑같네요.",
"앞사람은 크게, 뒷사람은 작게 그려 행렬이 다가오는 느낌을 줬어요."
],
"wmmun11f9e0": [
"뭉크는 단순한 풍경에서도 움직임을 놓치지 않았대요. 오늘 스쳐 가는 순간 하나를 붙잡아 봐요.",
"바닷가를 따라 길게 꼬리를 그리는 기차 연기를 따라가 보세요.",
"연기는 흩어져도 기차는 계속 가요. 당신도 잘 가고 있어요.",
"연기 꼬리가 이렇게 길면, 기차도 오늘 꽤 바쁜가 봐요.",
"이 그림은 1900년, 바닷가를 달리는 기차를 그린 풍경화예요."
],
"wmmun8f290a": [
"통나무 하나가 시선을 숲 안쪽으로 이끌어요. 오늘 내 마음을 이끄는 건 뭘까요?",
"노란 통나무를 따라 숲 깊은 곳까지 들어가 보세요.",
"눈 덮인 숲에도 노란빛 하나가 있어요. 차가운 날에도 따뜻한 구석은 있어요.",
"눈밭에 노란 통나무라니, 혼자 튀는 패션 감각이에요.",
"원근법을 이렇게 과감하게 쓴 풍경화는 드물어요."
],
"shipwreck": [
"폭풍 속에서도 노를 젓는 손이 있어요. 오늘의 내 손처럼요.",
"집채만 한 파도 사이로 작은 구조선들을 찾아보세요.",
"파도가 아무리 커도 건지려는 손은 멈추지 않아요. 오늘도 누군가 곁에 있어요.",
"이 파도에 비하면 오늘 내 고민은 물웅덩이 정도예요. 아마도요.",
"터너의 작품 가운데 처음으로 판화로 만들어져 널리 퍼진 그림이에요."
],
"met437852": [
"강가 선착장에 모두 모여 나룻배를 기다려요. 오늘은 조금 천천히 가도 돼요.",
"잔잔한 물빛 위 나룻배 선착장, 강가에 모인 사람들과 가축도 찾아보세요.",
"물빛이 잔잔한 오후예요. 내 마음도 잠시 이렇게 고요해져도 괜찮아요.",
"나룻배 기다리는 줄엔 사람도 가축도 서요. 기다림 앞에선 모두 평등해요.",
"솔태시는 영국 콘월의 타마르강가에 있는 마을이에요."
],
"met437853": [
"터너는 베네치아를 평생 세 번 찾았어요. 좋아하는 곳은 몇 번이고 다시 가도 돼요.",
"물과 하늘과 건물이 만나는 경계를 찾아보세요. 빛 속에서 하나로 녹아 있어요.",
"경계가 흐려져도 괜찮아요. 오늘은 빛에 섞여 잠시 쉬어 가요.",
"물도 하늘도 건물도 다 녹았어요. 내 피곤함도 여기 같이 녹여 볼까요?",
"1835년 영국 왕립 아카데미에 걸렸던 베네치아 풍경이에요."
],
"met437854": [
"터너는 말년에 고래잡이 그림을 네 점이나 그렸어요. 한 주제를 오래 붙드는 것도 멋이에요.",
"증기 같은 빛 속에서 배와 물보라를 찾아보세요. 경계가 흐릿하게 섞여 있어요.",
"흐릿한 날도 있어요. 경계가 흐린 하루도 그대로 하나의 풍경이에요.",
"어디가 배고 어디가 물보라일까요? 숨은그림찾기 고급 단계예요.",
"이 그림은 터너가 말년에 고래잡이를 주제로 그린 네 점 가운데 하나예요."
],
"wmtur20ef30": [
"혹평받던 그림을 한 젊은이가 변호했어요. 누군가의 응원이 큰 시작이 되기도 해요.",
"베네치아 산마르코 광장의 빛을 보세요. 줄리엣이 그곳에 와 있어요.",
"모두가 고개를 저어도 내 편 한 명은 꼭 있어요. 오늘도요.",
"베로나에 있어야 할 줄리엣이 베네치아로 놀러 왔어요. 화가 마음대로 떠난 여행이에요.",
"이 그림을 변호한 글이 존 러스킨의 유명한 미술론의 출발점이 됐어요."
],
"wmturcd365d": [
"터너는 같은 산을 푸른빛, 붉은빛으로 여러 번 그렸어요. 같은 하루도 매번 달라요.",
"호수 너머 리기산이 해 질 녘 붉은빛에 물들어 있어요.",
"하루가 끝나는 붉은 순간이에요. 오늘 하루도 수고 많았어요.",
"같은 산을 몇 번이나 그렸대요. 산도 이제 포즈가 익숙했겠어요.",
"스위스 루체른 호수에서 바라본 리기산을 그린 수채화예요."
],
"wmtur8c64ac": [
"터너는 주인공을 작게, 노을을 크게 그렸어요. 큰 풍경 속 작은 나도 괜찮아요.",
"황금빛 노을 아래 웅장한 도시가 펼쳐져요. 사람들은 아주 작게 보여요.",
"슬픈 이야기도 황금빛 노을이 감싸 줘요. 오늘 마음도 그렇게 감싸질 거예요.",
"주인공보다 노을이 더 크게 나왔어요. 터너다운 캐스팅이에요.",
"고대 로마의 아그리피나가 항구에 도착하는 장면을 그린 그림이에요."
],
"wmtur3e4cc3": [
"거친 날씨를 만난 기억이 그림이 됐어요. 힘든 날도 언젠가 좋은 이야기가 돼요.",
"스코틀랜드 스타파섬의 거친 바다와 하늘을 보세요. 터너가 직접 겪은 날씨예요.",
"날씨가 거칠어도 지나가요. 오늘의 바람도 그럴 거예요.",
"여행 날 날씨가 엉망이어도 괜찮아요. 터너는 그걸로 그림을 남겼어요.",
"이 그림은 미국으로 건너간 터너의 첫 유화예요."
],
"wmtur90806e": [
"터너는 스물한 살에 이 그림으로 첫 유화를 선보였어요. 처음은 언제나 용기예요.",
"차가운 달빛과 어부들의 붉은 등불을 나란히 보세요.",
"거친 바다에도 작은 등불 하나가 켜져 있어요. 오늘 내 등불도요.",
"달빛은 차갑고 등불은 따뜻해요. 냉온 조절이 확실한 그림이에요.",
"스물한 살의 터너가 왕립 아카데미에 처음 선보인 유화예요."
],
"wmturb61091": [
"밤새 석탄을 싣던 사람들이 있었어요. 묵묵한 오늘의 수고도 빛이 나요.",
"달빛과 횃불 사이, 배들의 검은 실루엣을 찾아보세요.",
"밤이 길어도 달빛과 횃불이 함께 있어요. 혼자가 아니에요.",
"야근도 달빛 아래면 낭만일까요? 그래도 오늘은 일찍 들어가요.",
"영국 뉴캐슬의 타인강에서 밤새 석탄을 싣던 인부들을 그렸어요."
],
"wmtur549220": [
"신화 속 주인공보다 아침 햇살이 더 빛나요. 오늘 아침도 그 자체로 주인공이에요.",
"아침 햇살에 물든 바다와 공기를 보세요. 화면 전체가 빛나요.",
"아침 햇살은 누구에게나 똑같이 와요. 오늘 나에게도요.",
"바다의 신이 반한 순간인데, 햇살이 주인공 자리를 가져갔어요.",
"오비디우스의 『변신 이야기』 속 한 장면을 그린 그림이에요."
],
"wmture51127": [
"시빌레는 긴 수명을 얻고 젊음은 청하지 못했대요. 긴 시간보다 오늘의 빛이 소중해요.",
"아름다운 바닷가 풍경 속에서 아폴론과 시빌레를 찾아보세요.",
"덧없는 것도 이렇게 아름다운 풍경 속에 있어요. 지나가는 오늘도 아름다워요.",
"소원은 꼼꼼히 빌어야 해요. 시빌레가 몸소 알려 줬어요.",
"바이아이 만은 이탈리아 나폴리 근처에 있어요."
],
"wmtur511ffd": [
"터너는 존경하던 화가에게 그림으로 경의를 보냈어요. 오늘 고마운 사람을 떠올려 봐요.",
"바람이 멎은 바다 위에 여객선이 가만히 멈춰 서 있어요.",
"바람이 멎으면 잠시 멈춰도 돼요. 배도 그렇게 쉬어 가요.",
"바람이 멎어서 배도 쉬는 중이에요. 오늘은 나도 같이 쉬어 볼까요?",
"터너가 존경하던 네덜란드 화가 카위프에게 보내는 경의가 담긴 그림이에요."
],
"wmtur52cd04": [
"거친 바다에서도 배는 방향을 틀 수 있어요. 오늘 방향을 바꿔도 괜찮아요.",
"거친 바다 위에서 방향을 트는 배를 보세요. 바람이 느껴져요.",
"길을 바꾸는 건 실패가 아니에요. 바람을 읽은 거예요.",
"터너는 반 트롬프를 주인공으로 여러 점을 그렸어요. 최애 제독이었나 봐요.",
"반 트롬프는 17세기 네덜란드의 제독이에요."
],
"wmtur4f2d8f": [
"빛의 화가도 시작은 단정한 젊은이였어요. 오늘의 나도 어떤 시작점에 있어요.",
"스물네 살 무렵 터너의 얼굴을 보세요. 단정한 젊은이예요.",
"지금의 내 모습도 언젠가 소중한 시작으로 남을 거예요.",
"폭풍을 그린 화가인데 모습은 단정해요. 바람은 그림에만 불었나 봐요.",
"이 자화상을 그릴 무렵 터너는 왕립 아카데미 준회원으로 뽑혔어요."
],
"wmtur2262ee": [
"실제로 없는 항구에 존경하는 화가의 이름을 붙였어요. 마음은 이렇게도 전해요.",
"거센 파도 위로 낮게 깔린 구름을 보세요.",
"지도에 없는 곳도 마음속엔 있어요. 오늘 쉬고 싶은 나만의 항구처럼요.",
"지도 앱에 검색해도 안 나와요. 터너의 상상 속에만 있는 항구예요.",
"라위스달은 터너가 존경하던 네덜란드 화가예요."
],
"wmtura3d701": [
"슬픔을 그림으로 남긴 화가가 있었어요. 마음도 꺼내 두면 조금 가벼워져요.",
"형체가 녹아내린 듯 흐릿해요. 색이 번지는 자리를 천천히 따라가 보세요.",
"흐릿한 마음도 그대로 괜찮아요. 선명해지는 데는 시간이 걸려요.",
"윤곽이 이렇게 흐릿해도 그림이 돼요. 오늘 계획이 좀 흐릿해도 괜찮아요.",
"요한계시록의 한 장면에서 온 그림이에요."
],
"wmturdb590b": [
"말년에도 터너는 스위스로 자주 떠났어요. 설레는 일엔 나이가 없어요.",
"호수와 산과 하늘이 엷은 색으로 번져 있어요. 아침 안개 속 루체른이에요.",
"안개 낀 아침도 꿈처럼 아름다워요. 아직 흐릿한 오늘도요.",
"번진 건 물감일까요, 안개일까요? 둘 다 맞아요.",
"터너는 말년에 스위스의 호수 풍경을 수채화로 남겼어요."
],
"wmtur3e4166": [
"이 그림은 등대를 지은 기술자의 책에 넣을 삽화였어요. 작은 일도 오래 남아요.",
"암초 위 등대가 거센 파도를 맞으며 서 있어요.",
"파도가 거세도 등대는 그 자리에 있어요. 오늘 나도 그렇게 서 있어요.",
"매일 파도를 맞는 등대도 있어요. 출근길 정도는 할 만하죠?",
"벨록 등대는 스코틀랜드 앞바다의 암초 위에 세워졌어요."
],
"wmturfee3f6": [
"몇 번의 붓질만으로 달밤을 그렸어요. 오늘은 조금만 해도 충분해요.",
"호숫가에 번지는 달빛을 보세요. 붓질 몇 번이 만든 빛이에요.",
"달빛이 조용히 번지는 밤이에요. 오늘 마음도 이렇게 고요하길 바라요.",
"터너의 여행 스케치는 수백 장이래요. 내 여행 사진첩도 지지 않아요.",
"터너의 여행 스케치에는 이런 순간이 수백 장 남아 있어요."
],
"kandinsky": [
"칸딘스키는 색에서 소리를 들었대요. 오늘 내 하루는 어떤 소리일까요?",
"얽혀 있는 색과 형태 가운데 가장 크게 울리는 색을 하나 골라 보세요.",
"복잡한 하루도 하나의 그림이 돼요. 엉킨 색들도 결국 어울려요.",
"습작만 서른 점이 넘었대요. 칸딘스키도 연습은 많이 했어요.",
"1차 세계대전 전에 그린 칸딘스키 작품 가운데 가장 복잡한 그림으로 꼽혀요."
],
"wmkan0aa900": [
"음악회 하나가 편지를 주고받는 친구를 만들었어요. 좋아하는 걸 나누면 사람이 와요.",
"커다란 검은 형태는 피아노, 노란 물결은 음악이에요.",
"노란 음악이 화면 가득 번져요. 오늘 좋아하는 노래 하나 틀어 봐요.",
"피아노는 검게, 소리는 노랗게. 칸딘스키 귀에는 음악이 노란색이었나 봐요.",
"1911년 1월 뮌헨에서 쇤베르크의 음악회를 듣고 그린 그림이에요."
],
"wmkanfd7937": [
"칸딘스키는 바깥에서 받은 느낌을 「인상」이라 불렀어요. 오늘의 인상 하나를 기억해 봐요.",
"말 탄 사람과 산책하는 사람들을 찾아보세요. 색과 선 사이로 흩어지고 있어요.",
"흩어지는 산책길도 아름다워요. 오늘은 목적 없이 걸어도 괜찮아요.",
"산책하던 사람들이 색으로 풀어지고 있어요. 공원이 그만큼 편했나 봐요.",
"칸딘스키는 자기 그림을 「인상」, 「즉흥」, 「구성」으로 나눴어요."
],
"wmkanabf82e": [
"「즉흥」은 마음속에서 저절로 떠오른 것을 그린 그림이래요. 오늘은 떠오르는 대로 해 봐요.",
"말과 사람의 흔적을 찾아보세요. 색이 먼저 말을 걸어올 거예요.",
"계획 없이 떠오른 것도 소중해요. 즉흥도 나다운 방법이에요.",
"즉흥에도 번호를 붙였어요. 열네 번째 즉흥이라니, 꽤 계획적인 즉흥이에요.",
"칸딘스키는 「즉흥」을 마음속에서 저절로 떠오른 것을 그린 그림이라고 설명했어요."
],
"wmkan1a377f": [
"혼란스러운 시대에도 화가는 조용히 색을 놓았어요. 오늘 내 안의 고요를 찾아봐요.",
"회색 바탕 위에 떠다니는 색 덩어리들을 보세요.",
"회색 같은 날에도 색은 떠 있어요. 오늘 내 안에도 작은 색이 있어요.",
"회색 하루라고요? 칸딘스키는 거기에 색을 잔뜩 띄웠어요.",
"러시아 혁명 뒤 모스크바에서 그린 그림이에요."
],
"wmkan67b23a": [
"칸딘스키에게 기수는 낡은 것을 넘어서는 용기였어요. 오늘 작은 용기 하나 내 봐요.",
"말 탄 기수를 찾아보세요. 칸딘스키가 아끼던 상징이에요.",
"오늘 나를 태우고 달리는 건 나 자신이에요. 이미 충분히 용감해요.",
"미술 모임 이름까지 「청기사」라니, 기수 사랑이 진심이었어요.",
"1911년 칸딘스키가 친구들과 만든 미술 모임의 이름은 「청기사(푸른 기수)」예요."
],
"wmkan64fecc": [
"색에도 온도와 무게가 있대요. 오늘은 따뜻하고 가벼운 색을 골라 봐요.",
"붉은 점 하나가 화면 전체의 무게중심을 잡고 있어요.",
"작은 점 하나가 전체를 붙잡아요. 오늘의 작은 일도 그래요.",
"붉은 점 하나가 화면을 다 잡고 있어요. 작지만 존재감은 반장급이에요.",
"칸딘스키는 색에도 온도와 무게가 있다고 믿었어요."
],
"wmkanbf0d25": [
"대상이 사라지자 색이 춤추기 시작했어요. 익숙한 걸 내려놓으면 새로운 게 와요.",
"검은 점 주변으로 색들이 소용돌이치듯 퍼져 나가요.",
"마음 한가운데 검은 점이 있어도, 그 둘레엔 색이 번지고 있어요.",
"검은 점 하나 주위로 색들이 우르르 모였어요. 인기 많은 점이에요.",
"칸딘스키가 추상으로 건너가던 시기인 1912년에 그린 그림이에요."
],
"wmkan2d229d": [
"새 학교에서 가르치기 시작하자 그림도 정돈됐어요. 새 시작은 생각을 정리해 줘요.",
"검은 격자와 원, 직선을 따라가 보세요. 흐르던 색이 정리돼 있어요.",
"흩어진 마음도 언젠가 제자리를 찾아요. 격자처럼 차곡차곡요.",
"선생님이 되더니 그림도 줄을 맞춰 섰어요.",
"칸딘스키가 바우하우스에서 가르치기 시작한 1922년에 그린 그림이에요."
],
"wmkan04fe40": [
"색마다 어울리는 모양이 있다고 믿었대요. 오늘 나와 어울리는 모양은 뭘까요?",
"노랑, 빨강, 파랑을 하나씩 찾아보세요. 저마다 성격이 달라요.",
"서로 다른 색이 한 화면에 함께 있어요. 달라도 함께일 수 있어요.",
"노랑은 날카로운 삼각형이래요. 오늘 좀 예민하다면 노랑 탓으로 해요.",
"칸딘스키는 노랑은 삼각형, 빨강은 사각형, 파랑은 원과 어울린다고 봤어요."
],
"wmkan09eafb": [
"가장 조용한 모양이 가장 깊대요. 오늘은 조용히 깊어져 봐요.",
"분홍빛 바탕 위에 크고 작은 원들이 떠 있어요.",
"둥근 원처럼 모난 데 없이, 오늘은 나에게 부드러워도 돼요.",
"원들이 둥둥 떠 있어요. 분홍빛 비눗방울 같아요.",
"원은 칸딘스키가 가장 사랑한 형태예요."
],
"wmkane3bfd7": [
"칸딘스키에게 흰색은 시작 전의 고요였어요. 오늘은 아직 무엇이든 될 수 있어요.",
"하얀 바탕을 가로지르는 두 개의 검은 선을 찾아보세요.",
"아무것도 시작하지 않은 시간도 괜찮아요. 하얀 고요도 필요해요.",
"빈 종이 앞에서 망설일 땐 선부터 쭉 그어 봐요. 칸딘스키도 그랬나 봐요.",
"칸딘스키는 흰색을 아직 시작되지 않은 침묵에 빗댔어요."
],
"wmkan6473ec": [
"형태가 흐려지자 색이 앞으로 나섰어요. 오늘은 내 색을 먼저 보여 줘요.",
"눈 덮인 언덕을 달려 내려가는 세 명의 기수를 찾아보세요.",
"눈 덮인 언덕도 함께 달리면 덜 추워요. 오늘 곁의 사람을 떠올려 봐요.",
"눈 언덕을 말 타고 내려가요. 썰매보다 빠를까요?",
"형태가 흐려지고 색이 앞으로 나서기 시작한 1911년의 풍경화예요."
],
"wmkan3d8b4e": [
"맑은 빛을 만나 칸딘스키의 색이 대담해졌어요. 오늘은 좋은 빛 쪽으로 가 봐요.",
"작은 마을 풍경 속에 솟은 탑을 찾아보세요.",
"좋은 곳, 좋은 사람 곁에서 색은 저절로 짙어져요.",
"작은 마을에서 지냈을 뿐인데 색이 확 대담해졌어요. 시골 빛의 힘이에요.",
"칸딘스키는 무르나우에서 화가 가브리엘레 뮌터와 함께 지냈어요."
],
"wmkan4b0cbe": [
"추상화가가 되기 전엔 칸딘스키도 자연 앞에서 풍경을 그렸어요. 누구나 기본에서 시작해요.",
"호숫가 풍경을 천천히 보세요. 학생들과 야외로 나가 그린 그림이에요.",
"가끔은 밖으로 나가 자연을 보면 마음이 풀려요.",
"오늘은 칸딘스키 선생님과 야외 수업 날이에요. 준비물은 붓과 호수예요.",
"칸딘스키는 뮌헨에서 미술 학교를 이끌던 시절 이 그림을 그렸어요."
],
"wmkan6dcc48": [
"여행에서 본 색이 그림에 오래 남았대요. 오늘 본 색 하나를 기억해 봐요.",
"하얀 집들과 강한 햇빛을 보세요.",
"낯선 곳에서 본 빛은 오래 남아요. 오늘의 낯섦도 언젠가 내 색이 돼요.",
"겨울에 떠난 여행인데 햇빛이 쨍해요. 겨울 여행 대성공이에요.",
"칸딘스키는 1904년 겨울부터 이듬해까지 튀니지를 여행했어요."
],
"wmkand52f8b": [
"낯선 거리에서 칸딘스키는 색을 새로 봤어요. 익숙한 길도 오늘은 색으로 봐요.",
"골목을 오가는 사람들이 짧은 색 점으로 그려져 있어요.",
"북적이는 골목도 색 점으로 보면 한결 부드러워요.",
"사람도 골목도 색 점으로 콕콕. 칸딘스키식 거리 사진이에요.",
"칸딘스키는 여행지의 강한 빛 속에서 색이 형태보다 먼저 보인다고 느꼈어요."
],
"wmkan0de1b9": [
"칸딘스키는 바닷가 마을에서 겨울을 보내며 흐린 바다도 그렸어요. 흐린 날도 쓸모 있어요.",
"흐린 하늘과 거센 바다가 어두운 색으로 빠르게 그려져 있어요.",
"흐린 하늘 아래 바다도 언젠가 잔잔해져요.",
"바다 보러 갔는데 날이 흐렸어요. 그래도 그림 한 장은 건졌어요.",
"1905년 겨울, 칸딘스키는 이탈리아의 해안 마을 라팔로에서 지냈어요."
],
"wmkanf89fe0": [
"서른 살에 법학을 접고 그림을 시작했어요. 새 출발에 늦은 때는 없어요.",
"겨울 풍경 속 슈바빙 동네를 천천히 둘러보세요.",
"겨울은 새로 자리 잡는 계절이기도 해요. 오늘 천천히 뿌리내려요.",
"법전 대신 붓을 들었어요. 겨울 거리가 법보다 재밌었나 봐요.",
"슈바빙은 칸딘스키가 살던 뮌헨의 예술가 동네예요."
],
"wmkan17d289": [
"고향의 민담과 색은 칸딘스키 그림 깊숙이 남았어요. 내 뿌리도 오늘의 나를 만들어요.",
"어두운 바탕 위에 마을과 사람들이 동화처럼 그려져 있어요.",
"어두운 바탕 위에도 이야기는 환하게 피어나요.",
"동화책 한 장을 펼쳐 놓은 것 같아요. 다음 장이 궁금해요.",
"고향 러시아의 민담과 색채는 칸딘스키가 추상화가가 된 뒤에도 그림에 남았어요."
],
"matisse": [
"얼굴이 초록빛이어도 명작이 돼요. 오늘 내 컨디션도 나름 예술이에요.",
"모자 아래 얼굴에 숨은 색이 몇 가지인지 세어 보세요.",
"거칠다는 말을 들어도 괜찮아요. 그 색이 결국 이름이 됐어요.",
"비평가가 붙인 별명이 미술사에 남았어요. 오늘 들은 별명도 혹시 모르니 아껴 둬요.",
"‘야수파’라는 이름은 1905년 살롱 도톤에서 이 그림을 본 비평가의 말에서 나왔어요."
],
"wmmat29f069": [
"전쟁 중에 마티스의 색은 차분해지고 구성은 단단해졌어요. 시끄러운 날엔 하나만 단단히 붙잡아 봐요.",
"굵은 윤곽선을 따라 사과를 하나씩 눈으로 그려 보세요.",
"탁자 위 사과 그릇처럼, 오늘도 제자리를 지켜 주는 것들이 있어요.",
"윤곽선이 굵어서 사과들 존재감이 대단해요. 오늘은 나도 이 정도로 당당하게.",
"이 그림은 1차 세계대전 중인 1916년에 그려졌어요."
],
"wmmatb360c1": [
"야수파가 나오기 몇 해 전부터 이미 강한 색을 썼어요. 남들보다 먼저 시작해도 괜찮아요.",
"숲 전체에 번진 붉은빛을 따라 시선을 옮겨 보세요.",
"붉게 물든 숲처럼, 조금 달아오른 마음도 오늘 풍경의 일부예요.",
"실제보다 색을 진하게 칠했대요. 오늘 사진도 이 정도 보정은 괜찮아요.",
"젊은 마티스가 1901년에 그린 풍경화로, 야수파가 등장하기 몇 해 전 작품이에요."
],
"wmmatd3358c": [
"마티스는 꽃과 뒤의 무늬를 똑같이 아꼈어요. 오늘은 배경 같은 일들도 다정하게 봐 줘요.",
"꽃병 뒤 무늬 천을 보세요. 수선화만큼 공들여 그려져 있어요.",
"주인공이 아니어도 괜찮아요. 이 그림에선 뒤의 무늬도 꽃만큼 소중해요.",
"이 그림의 배경 천은 조연이 아니에요. 사실상 공동 주연이에요.",
"마티스는 사물과 무늬를 똑같이 중요하게 다뤄서, 화면 전체가 하나의 장식처럼 보여요."
],
"wmmatb52bd2": [
"그림자 대신 초록 줄 하나를 그었어요. 처음엔 다들 놀랐지만, 결국 상징이 됐어요.",
"얼굴 한가운데를 지나는 초록 줄을 위에서 아래로 따라가 보세요.",
"처음엔 낯설다는 말을 들어도 괜찮아요. 이 초록 줄도 그랬어요.",
"아내 초상에 초록 줄을 쓱 그었어요. 화가의 사랑은 역시 대담해요.",
"이 초상의 모델은 마티스의 아내 아멜리예요. 빛과 그림자를 초록 줄과 색면으로 대신했어요."
],
"wmmat748122": [
"보내기 직전에 파랑을 전부 빨강으로 바꿨어요. 마지막 순간의 마음 변화도 괜찮아요.",
"벽 무늬와 식탁보 무늬가 어디서 이어지는지 찾아보세요.",
"다 끝났다 싶을 때 다시 칠해도 늦지 않아요.",
"파란 그림을 기다리던 수집가는 빨간 그림을 받았어요. 깜짝 선물이 따로 없어요.",
"이 그림은 원래 파란색이었는데, 러시아 수집가 시추킨에게 보내기 직전 빨강이 됐어요."
],
"wmmatcd2116": [
"드랭과 함께 보낸 여름이 야수파의 시작이 됐어요. 좋은 사람 곁에선 색이 더 진해져요.",
"열린 창 너머로 보이는 바깥 풍경을 천천히 둘러보세요.",
"창문 하나만 열어도 공기가 바뀌어요. 오늘은 그 정도면 충분해요.",
"친구랑 여름 내내 강렬하게 그렸더니 ‘야수’라는 별명이 생겼어요. 여름의 위력이에요.",
"콜리우르는 지중해 마을이에요. 1905년 여름, 마티스는 이곳에서 드랭과 함께 지냈어요."
],
"wmmatff80ca": [
"마티스는 바라보기만 해도 마음이 쉬어 가는 장면을 좋아했어요. 오늘 잠깐 멍하니 있어도 돼요.",
"둥근 어항 속 금붕어가 몇 마리인지 세어 보세요.",
"빙글빙글 도는 금붕어처럼, 천천히 맴도는 날이 있어도 괜찮아요.",
"꽃과 잎에 둘러싸인 금붕어들, 오늘 이 동네 귀빈이에요.",
"마티스는 금붕어를 여러 번 그렸어요. 이 그림 속 어항엔 네 마리가 있어요."
],
"wmmatec0a94": [
"작업실을 온통 빨강으로 칠해 버렸어요. 내 공간은 내 마음대로 꾸며도 돼요.",
"빨강 속에 작게 떠 있는 그림들을 하나씩 찾아보세요.",
"모든 게 한 색으로 녹아드는 날도 있어요. 그래도 소중한 건 또렷이 남아요.",
"벽도 바닥도 가구도 빨강이에요. 물건 찾기가 꽤 힘들었겠어요.",
"그림 속 작업실은 파리 근교 이시레물리노에 있었어요."
],
"wmmat058947": [
"대성당을 선 몇 개와 파랑만으로 남겼어요. 오늘 할 일도 꼭 필요한 것만 남겨 봐요.",
"푸른 색면 속에서 대성당의 윤곽을 찾아보세요.",
"복잡한 하루도 멀리서 보면 선 몇 개예요. 너무 무겁게 들지 않아도 돼요.",
"그 큰 대성당을 선 몇 개로 끝냈어요. 요약의 달인이에요.",
"마티스는 센강 변 작업실 창으로 보이던 노트르담 대성당을 그렸어요."
],
"wmmat319f53": [
"큰 그림을 위한 작은 습작이에요. 오늘의 작은 연습도 언젠가 큰 그림이 돼요.",
"분홍, 초록, 주황 붓질이 어디서 춤추는지 따라가 보세요.",
"흩어져 보여도 괜찮아요. 짧은 붓질들이 모여 풍경이 됐어요.",
"나무도 언덕도 춤을 춰요. 이 동네는 흥이 많은 게 분명해요.",
"이 작은 풍경은 대작 「삶의 기쁨」을 위한 습작이에요."
],
"wmmat55eedb": [
"마티스는 검정도 빛나는 색이 될 수 있다고 믿었어요. 어두운 날에도 빛나는 구석은 있어요.",
"넓은 검정 위로 떠오른 과일을 찾아보세요.",
"어둠이 넓게 깔린 날에도 그 위로 떠오르는 것들이 있어요.",
"검정을 이렇게 빛나게 쓰다니, 검은 옷만 입는 사람들에게 든든한 응원이에요.",
"마티스는 1912년과 이듬해 모로코를 여행했고, 그 기억으로 이 그림을 그렸어요."
],
"wmmat95fda6": [
"아들 피에르의 연습 시간을 그렸어요. 조용히 쌓는 시간도 언젠가 그림이 돼요.",
"작은 피라미드처럼 생긴 메트로놈이 어디 있는지 찾아보세요.",
"고요한 연습 시간처럼, 오늘은 조용히 한 걸음이면 충분해요.",
"뒤쪽 그림 속 여인이 연습을 지켜보고 있어요. 땡땡이는 어려웠겠어요.",
"창밖 정원은 초록 삼각형 하나로, 메트로놈은 작은 피라미드로 그렸어요."
],
"wmmatacf404": [
"탕헤르에서 만난 소녀 조라를 그렸어요. 낯선 곳에서의 만남도 오래 남는 그림이 돼요.",
"테라스 위의 조라를 보고, 양옆에 이어질 두 그림도 상상해 보세요.",
"혼자 서 있는 것 같아도 이 그림은 다른 두 폭과 이어져 있어요. 우리도 그래요.",
"세 폭짜리 시리즈의 한 편이에요. 다음 화가 궁금해지는 그림이에요.",
"「모로코 삼면화」는 창 너머 풍경, 테라스의 조라, 성문 그림 세 점으로 이어져요."
],
"wmmatcb0b11": [
"전쟁이 끝난 이듬해, 평범한 오후를 그렸어요. 오늘의 평범함도 소중하게 챙겨요.",
"나무 그늘 아래 강아지가 어디 있는지 찾아보세요.",
"나무 그늘에서 차 한잔, 그런 오후가 오늘도 찾아오길 바라요.",
"찻자리에 강아지도 슬쩍 끼어 있어요. 간식 냄새는 못 참죠.",
"그림 속 정원은 이시레물리노의 마티스 집이고, 딸 마르그리트도 함께 있어요."
],
"wmmat5c630b": [
"마티스는 아끼는 무늬 천을 여러 그림에 다시 썼어요. 좋아하는 건 몇 번이고 꺼내도 돼요.",
"제라늄 화분 뒤에 깔린 푸른 무늬 천을 눈여겨보세요.",
"좋아하는 걸 곁에 두는 것만으로 마음이 조금 편해져요.",
"같은 천이 여러 그림에 나와요. 마티스 그림의 단골 출연자예요.",
"마티스는 무늬 있는 천을 무척 아껴서, 같은 천을 여러 그림에 거듭 그렸어요."
],
"wmmat87afa3": [
"침실 창밖 정원을 그렸어요. 오늘은 내 방 창밖부터 한번 내다봐요.",
"창턱 위 물건과 바깥 나무, 어디까지가 안이고 어디부터 밖인지 찾아보세요.",
"안과 밖이 같은 파랑이에요. 오늘은 마음 안팎이 조금 더 잔잔하길 바라요.",
"창턱 물건도 나무도 다 파랑이에요. 이 집엔 파란 물감이 넉넉했나 봐요.",
"그림 속 창은 이시레물리노 집 침실의 창이에요."
],
"wmmatc22a6d": [
"검은 바탕 위에서 단순한 형태가 더 또렷해져요. 오늘은 할 일 하나만 또렷하게 해 봐요.",
"검은 바탕 위 조롱박과 화병, 어느 쪽이 먼저 눈에 들어오나요?",
"어두운 배경이 있어서 더 또렷해지는 것도 있어요.",
"검정 배경 앞에 서니 조롱박도 화보 모델 같아요.",
"전쟁 중의 마티스는 검정을 자주 썼어요. 이 정물도 1916년 작품이에요."
],
"udnie": [
"몸이 먼저 기억하는 리듬이 있어요. 오늘은 그 리듬대로 가 봐요.",
"사람 모습 대신 남은 움직임이 어느 쪽으로 흐르는지 따라가 보세요.",
"모양이 흐릿해져도 괜찮아요. 리듬은 그대로 남아 있어요.",
"춤을 그렸는데 사람이 안 보여요. 너무 신나서 춤만 남고 퇴근했나 봐요.",
"뉴욕으로 가는 배 위에서 본 무용수의 춤을 기억해 그린 추상화예요."
],
"wmpic62c237": [
"알 수 없는 제목은 프랑스어 철자를 섞은 장난이었어요. 오늘은 조금 엉뚱해도 좋아요.",
"뒤섞인 조각들 속에서 무용수의 움직임을 찾아보세요.",
"다 이해되지 않는 날도 있어요. 이 제목처럼, 그냥 즐겨도 괜찮아요.",
"제목을 소리 내어 읽어 보세요. 발음이 꼬이는 게 정상이에요.",
"제목 에드타오니슬은 프랑스어 단어의 철자를 섞어 만든 말이에요."
],
"wmpic1f93d2": [
"레슬링에서 시작해 힘과 움직임만 남겼어요. 오늘 버틴 힘도 충분히 멋져요.",
"각진 조각들이 서로 부딪히는 자리를 찾아보세요.",
"얽힌 일이 많은 날이에요. 조각조각 하나씩 풀어 가면 돼요.",
"레슬링을 그렸는데 누가 이겼는지 모르겠어요. 오늘은 무승부로 해요.",
"이 그림은 레슬링 경기에서 영감을 받아 1913년에 그렸어요."
],
"wmpicd113cd": [
"물 긷는 장면이 조각조각 깨졌어요. 깨진 하루도 새로운 그림의 시작일 수 있어요.",
"갈색과 회색 조각들 사이에서 물 긷는 장면을 찾아보세요.",
"목이 마른 날엔 잠깐 멈춰서 물 한 잔 마셔요. 그것도 쉼이에요.",
"샘물을 긷는다는데 물이 잘 안 보여요. 오늘 물은 우리가 대신 마셔 둬요.",
"1912년 파리 살롱 도톤에 걸린 큰 그림이에요. 입체주의에서 추상으로 가는 길목의 작품이에요."
],
"wmpic3dc9e3": [
"빠른 춤의 리듬을 색 조각으로 옮겼어요. 오늘은 좋아하는 노래 한 곡에 몸을 맡겨 봐요.",
"색 조각들이 화면을 어느 방향으로 도는지 따라가 보세요.",
"정신없이 도는 하루여도 괜찮아요. 돌다 보면 리듬이 생겨요.",
"보기만 해도 어지러워요. 오늘은 그림이 대신 춤춰 줬으니 우리는 쉬어요.",
"타란텔라는 이탈리아의 빠른 춤이에요."
],
"wmpic3080b0": [
"기억 속 행렬을 각진 덩어리로 바꿨어요. 오래된 기억도 새 모양으로 꺼내 볼 수 있어요.",
"회색과 갈색 덩어리 속에서 뾰족한 두건을 찾아보세요.",
"천천히 걷는 행렬처럼, 오늘은 내 속도로 가도 돼요.",
"뾰족한 두건이 각진 덩어리가 됐어요. 원래 뾰족했으니 변신이 쉬웠겠어요.",
"스페인 세비야의 종교 행렬을 기억하며 그린 그림이에요."
],
"wmpic0fd64d": [
"피카비아는 그림에 유머를 담는 걸 좋아했어요. 오늘도 웃을 거리 하나 챙겨 가요.",
"수채 물감이 맑게 겹친 자리를 찾아보세요.",
"웃음에도 힘이 있어요. 오늘은 작은 웃음 하나면 충분해요.",
"제목부터 희극의 힘이에요. 이 그림 앞에서 진지한 표정은 반칙이에요.",
"뉴욕에서 돌아온 뒤 그린 수채화예요."
],
"wmpic6de986": [
"피카비아는 재료도 화풍도 자주 바꿨어요. 오늘 방법 하나쯤 바꿔 봐도 괜찮아요.",
"매끈하고 납작한 색면들 사이로 항구의 모습을 찾아보세요.",
"배가 항구에서 쉬어 가듯, 오늘 나도 잠시 쉬어 갈 자리가 있길 바라요.",
"규칙을 비웃던 화가의 그림치고 꽤 얌전해요. 그것도 반전이에요.",
"피카비아는 미술의 규칙을 비웃듯 재료와 화풍을 자주 바꾼 화가예요."
],
"wmpic2b20e5": [
"일부러 촌스럽게 그려 점잖은 미술을 놀렸어요. 오늘은 너무 멋 부리지 않아도 돼요.",
"외알 안경이 어느 쪽 눈에 걸려 있는지 찾아보세요.",
"완벽하게 세련되지 않아도 괜찮아요. 이 그림은 그게 매력이에요.",
"반짝이 장식에 외알 안경까지, 오늘 패션은 이 정도 자신감이면 돼요.",
"1920년대 피카비아가 그린 「괴물」 연작 중 한 점이에요."
],
"wmpicb46139": [
"파리를 떠나 남프랑스로 옮겨 가던 무렵의 그림이에요. 새 출발엔 강한 색이 어울려요.",
"굵은 선으로 그린 인물이 화면을 얼마나 밝히는지 보세요.",
"해는 매일 다시 떠요. 어제가 어땠든 오늘은 새로 시작이에요.",
"해돋이라는데 해 대신 사람이 빛나요. 오늘 주인공은 당신이라는 뜻이에요.",
"이 그림은 1924년, 피카비아가 남프랑스로 옮겨 가던 무렵에 그려졌어요."
],
"wmpic288983": [
"칸에서 즐겁게 지낸 흥이 그림에 그대로 묻어났어요. 오늘의 즐거움도 어딘가에 남아요.",
"소란스러운 무도회 속에서 가면을 하나 찾아보세요.",
"가면 뒤에서 잠깐 쉬어도 괜찮아요. 오늘 다 보여 주지 않아도 돼요.",
"그림만 봐도 음악 소리가 들려요. 층간소음 신고는 참아 주세요.",
"피카비아는 이 무렵 칸에서 파티와 자동차 경주를 즐기며 지냈어요."
],
"wmpic59b6a0": [
"우스꽝스러운데 사랑스러운 그림이에요. 오늘 내 모습도 딱 그만큼이면 돼요.",
"비 그친 뒤 나란히 있는 두 사람의 표정을 비교해 보세요.",
"비는 결국 그쳐요. 그 뒤엔 곁에 있는 사람이 더 잘 보여요.",
"표정이 과장돼도 사랑은 사랑이에요. 비 온 뒤라 감정도 촉촉한가 봐요.",
"이 그림도 「괴물」 연작 중 하나예요. 1925년에 그렸어요."
],
"wmpic485b63": [
"축제의 혼란을 그대로 옮겼어요. 정리 안 된 하루도 나름 축제예요.",
"뒤섞인 얼굴들 사이에서 가면과 색종이를 찾아보세요.",
"어수선한 날이어도 괜찮아요. 축제도 원래 이렇게 정신없어요.",
"색종이가 이렇게 많으면 청소는 누가 하죠. 일단 오늘은 즐기기로 해요.",
"마르디 그라는 축제 이름이에요. 피카비아는 그 소란을 1925년에 그렸어요."
],
"wmpic395d29": [
"아방가르드 화가가 일부러 대중적인 주제를 골랐어요. 오늘은 모두가 좋아하는 걸 즐겨 봐도 좋아요.",
"부채와 꽃, 레이스를 하나씩 찾아보세요.",
"화려하게 꾸미고 싶은 날도, 그렇지 않은 날도 다 괜찮아요.",
"부채, 꽃, 레이스까지 장식이 풀코스예요. 덜어 내기는 내일 하기로 해요.",
"스페인 여인들은 피카비아가 1920년대에 즐겨 그린 주제예요."
],
"wmpic239ead": [
"나무와 얼굴을 투명하게 겹쳐 그렸어요. 오늘 하루에도 여러 장면이 겹쳐 있을 거예요.",
"나무 사이로 겹쳐 보이는 얼굴을 찾아보세요.",
"생각이 겹겹이 쌓인 날이에요. 하나씩 천천히 봐도 괜찮아요.",
"한 그림에서 두 장면을 볼 수 있어요. 아주 알뜰한 그림이에요.",
"1930년 무렵 피카비아는 이미지를 투명하게 겹치는 「투명화」 연작을 그렸어요."
],
"wmpic018901": [
"오래 들여다볼수록 숨은 형상이 떠올라요. 오늘 만나는 사람도 천천히 봐 주세요.",
"유리창에 비친 듯 겹친 얼굴이 몇 개인지 세어 보세요.",
"한 번에 다 보이지 않아도 괜찮아요. 천천히 보면 드러나는 것들이 있어요.",
"숨은그림찾기 고수용 그림이에요. 다 찾으면 오늘 눈 운동은 끝이에요.",
"「투명화」 연작 중 한 점이에요. 1930년에 그렸어요."
]
};
/*LINES-END*/
