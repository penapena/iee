<?php
/**
 * 渲染下拉菜单
 */
function renderOptions($options = array(), $value = ''){
    $str = '';
    foreach($options as $opt){
        $val = $opt['value'];
        $str .= '<option value="' . $val . '"' . ($val === $value ? ' selected' : '') . '>' . $opt['html'] . '</option>';
    }
    print $str;
}

/**
 * 渲染翻页组件
 */
function renderPager($list, $hasPrev, $hasNext, $act){
    $str = '';

    if($hasPrev || $hasNext){
        $str .= '<div class="pagination">';

        if($hasPrev){
            $str .= '<a class="pager-prev" title="上一页" href="?page=prev&id=' . $list[0]->id . '" data-act="' . $act . '"></a>';
        }else{
            $str .= '<span class="pager-prev" title="上一页"></span>';
        }

        if($hasNext){
            $str .= '<a class="pager-next" title="下一页" href="?page=next&id=' . $list[count($list) - 1]->id . '" data-act="' . $act . '"></a>';
        }else{
            $str .= '<span class="pager-next" title="下一页"></span>';
        }

        $str .= '</div>';
    }

    print $str;
}

/**
 * 获取post的展示用ID
 */
function getPostRootId($postObj){
    return $postObj->sid ? $postObj->sid : $postObj->id;
}

/**
 * 渲染文章
 */
function renderPost($postObj, $params = array()){
    $params = array_merge(array_merge(array(
        'headerTag'      => 'div',
        'albumImgWidth'  => 288,
        'albumImgHeight' => 378,
        'lazyImg'        => false
    ), $params));

    $id = getPostRootId($postObj);

    //有些文章不存在buylink
    $link = empty($postObj->buylink) ? $postObj->outer_url : $postObj->buylink;
    $link = $link ? ('href="' . $link . '"') : '';

    $html = '<div class="stdpost" data-id="'.$id.'">';

    //渲染核心部分
    $html .= '<div class="core">';

    //渲染图片
    $html .= '<div class="photo"><a ' . $link. '><img ' . ($params['lazyImg'] ? 'data-lazy' : 'src') . '="' . $postObj->img . '" width="320" height="420" /></a></div>';

    //渲染主内容区域
    $html .= '<div class="detail">';
    $html .= '<' . $params['headerTag'] . ' class="title">' . $postObj->title . '</' . $params['headerTag'] . '>';
    $html .= '<div class="content">' . $postObj->fullcontent . '</div>';
    if($postObj->price){
        $html .= '<div class="price">' . $postObj->price . '</div>';
    }
    $html .= '<div class="action">';
    if($link){
        $html .= '<a class="go-view" ' . $link . '>点此拥有</a>';
    }
    $html .= '<ins class="post-share"></ins></div>';

    if('n' === $postObj->onsale){
        $html .= '<ins class="off-sign"></ins>';
    }

    $html .= '</div>';
    $html .= '</div>';

    //专辑商品
    if($postObj->albumItems){
        $html .= '<div class="albumitem">';
        foreach($postObj->albumItems as $item){
            $html .= renderTinyPost($item, array(
                'imgWidth' => $params['albumImgWidth'],
                'imgHeight' => $params['albumImgHeight']
            ));
        }
        $html .= '</div>';
    }

    $html .= '</div>';

    return $html;
}

//渲染文章（首页样式）
//支持专辑条目的渲染
function renderTinyPost($postObj, $params = array()){
    $params = array_merge(array(
        'lazyImg' => false,
        'imgWidth' => 320,
        'imgHeight' => 420
    ), $params);

    $id = getPostRootId($postObj);

    if($id){
        $html = '<a class="pin" href="/' . getPostRootId($postObj) . '">';
    }else{
        //是专辑商品这类的
        $buylink = $postObj->buylink ? $postObj->buylink : $postObj->outer_url;
        $html = '<a class="pin" data-url="' . $buylink . '">';
    }

    $html .= '<img width="' . $params['imgWidth'] . '" height="' . $params['imgHeight'] . '" ' . ($params['lazyImg'] ? 'data-lazy' : 'src') . '="' . $postObj->img . '"/>';

    $html .= '<div class="extra">';
    $html .= '<div class="mask"></div>';

    if($postObj->modified){
        $timestamp = strtotime($postObj->modified);

        $html .= '<div class="stddate">';
        $html .= '<span class="day">' . date('d', $timestamp) . '</span>';
        $html .= '<span class="month">' . date('M', $timestamp) . '</span>';
        $html .= '<span class="year">' . date('Y', $timestamp) . '</span>';
        $html .= '</div>';
    }

    $html .= '<div class="title">' . $postObj->title . '</div>';
    $html .= '<div class="desc">' . $postObj->fullcontent . '</div>';

    if($postObj->nick){
        $html .= '<div class="author"><s></s>' . $postObj->nick . '</div>';
    }

    $html .= '</div>';

    if('album' === $postObj->type){
        $html .= '<s class="type-album"></s>';
    }

    $html .= '</a>';

    return $html;
}