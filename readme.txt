本网站支持两种图片src来源:
    如使用本地src，则可以无需网络查看本网站。
    如使用SM.MS外链，则可部署到github Page服务上，以便在互联网上查看。
部署网址:abelgroup.github.io

如何切换图片的src来源（本地/SM.MS外链）;
只需一步:

    修改myjs文件夹里main.js的:
    const use_local_src = true;
常量类型:bool:
    true 为本地
    false 为SM.MS图床外链
