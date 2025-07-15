import { ImlHTMLElement } from './lib/iml-html-element.js';
import { customElement, property } from './lib/decorators.js';

@customElement('iml-slideshow')
export class ImlSlideshow extends ImlHTMLElement {

    private static _currentHoverImlSlideshow: ImlSlideshow | null = null;
    private static _observer: IntersectionObserver;

    private _indexImage: number = -1;   // -1 default image, >= 0 index images slideshow
    private _interval: number | undefined;
    private $image: HTMLImageElement | null = null;

    /** Le mode de lecture du diaporama */
    @property({ render: true }) mode: 'hover' | 'autoplay' = 'hover';

    /** L'état de lecture du diaporama */
    @property({ render: true }) status: 'active' | 'inactive' = 'active';

    /** L'url par défaut de l'image lorsque le diaporama est à l'arrêt */
    @property({ render: true }) defaultImageUrl?: string;

    /** Les urls des images qui défilent lors du diaporama */
    @property({ type: 'object' }) imageUrls?: string[];
    
    /** Mode de chargement des images */
    @property({ render: true }) loading: 'lazy' | 'eager' = 'lazy';

    static {
        ImlSlideshow._observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const target = entry.target as ImlSlideshow;
                if (!entry.isIntersecting && target == ImlSlideshow._currentHoverImlSlideshow)
                    target._stopHover();
            });
        }, { root: null, threshold: 0.5 });
        document.addEventListener('visibilitychange', function () {
            if (document.visibilityState === 'visible')
                ImlSlideshow._currentHoverImlSlideshow?._stopHover();
        });
    }

    protected override disconnected() {
        this._clearInterval();
        ImlSlideshow._observer.unobserve(this);
    }

    protected override beforeRender() {
        this._clearInterval();
        ImlSlideshow._observer.unobserve(this);
    }

    private _clearInterval() {
        clearInterval(this._interval);
        this._indexImage = -1;
    }

    protected override html() {
        return `<img src="${this._currentImageUrl ?? ""}" alt="" loading="${this.loading}" />`;
    }

    protected override renderUpdated() {
        this.$image = this.queryShadowSelector('img')!;
        this._hiddenImage404();
        if (this.status == 'active') {
            if (this.mode == 'hover')
                this._initHover();
            else
                this._startAutoplay();
        }
    }
    
    private _hiddenImage404(){
        this.$image?.addEventListener('error', () => {
            this.$image!.style.display = 'none';
        });
    }

    private _initHover() {
        if (this._isCoarsePointer()) {
            this.$image!.addEventListener('load', () => this._loadFirstImage(), { once: true });
            this.addEventListener('touchmove', () => this._startHover());
            ImlSlideshow._observer.observe(this);   // stopHover
        }
        else {
            this.addEventListener('mouseenter', () => this._startHover());
            this.addEventListener('mouseleave', () => this._stopHover());
        }
        this.$image?.addEventListener('error', () => this._errorImage());
    }

    private _isCoarsePointer() {
        return window.matchMedia('(pointer: coarse)').matches;
    }

    private _loadFirstImage() {
        if ((this.imageUrls?.length ?? 0) >= 1) {
            const image = new Image();
            image.src = this.imageUrls![0];
        }
    }

    private _errorImage() {
        if (this._indexImage != -1) {
            this._clearInterval();
            this._updateImage();
        }
    }

    private _startHover() {
        if (this != ImlSlideshow._currentHoverImlSlideshow) {
            ImlSlideshow._currentHoverImlSlideshow?._stopHover();
            ImlSlideshow._currentHoverImlSlideshow = this;
            if (this._isCoarsePointer())
                this._nextImage();
            this._interval = setInterval(() => this._nextImage(), 700);
            this._preloadImages();
        }
    }

    private _stopHover() {
        ImlSlideshow._currentHoverImlSlideshow = null;
        this._clearInterval();
        this._updateImage();
    }

    private _updateImage() {
        const imageUrl = this._currentImageUrl;
        if (imageUrl)
            this.$image!.src = imageUrl;
            this.$image!.style.display = '';
    }

    private _startAutoplay() {
        this._interval = setInterval(() => this._nextImage(), 700);
        this._preloadImages();
    }

    private _nextImage() {
        if ((this.imageUrls?.length ?? 0) == 0)
            this._indexImage = -1;
        else if (this._indexImage == -1)
            this._indexImage = 0;
        else if (this._indexImage >= (this.imageUrls?.length ?? 0) - 1)
            this._indexImage = 0;
        else
            this._indexImage++;
        this._updateImage();
    }

    private get _currentImageUrl() {
        if (this._indexImage == -1)
            return this.defaultImageUrl;
        else if ((this.imageUrls?.length ?? 0) > this._indexImage)
            return this.imageUrls![this._indexImage];
        else
            return undefined;
    }

    private _preloadImages() {
        if (this.imageUrls) {
            for (const imageUrl of this.imageUrls) {
                const image = new Image();
                image.src = imageUrl;
            }
        }
    }

    protected override css() {
        // "display: flex;" used because space under image and height increase of 5px
        return `
        <!--suppress CssUnresolvedCustomProperty -->
        <style>
            img {
                display: flex;
                border-radius: var(--iml-slideshow-border-radius, 0);
                width: 100%;
                height: 100%;
                pointer-events: none;
            }
        </style>`;
    }
}
