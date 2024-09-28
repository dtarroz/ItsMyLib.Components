import { ImlHTMLElement } from './lib/iml-htmlelement.js';
import { customElement, property } from './lib/decorators.js';

@customElement('iml-slideshow')
export class ImlSlideshow extends ImlHTMLElement {

    private static _currentHoverImlSlideshow: ImlSlideshow | null = null;
    private static _observer: IntersectionObserver;

    private _indexImage: number = -1;   // -1 inactive image, >= 0 index images slideshow
    private _interval: NodeJS.Timeout | undefined;
    private $image: HTMLImageElement | null = null;

    /** Le mode de lecture du diaporama */
    @property({ render: true }) mode: 'hover' | 'autoplay' = 'hover';

    /** L'état de lecture du diaporama */
    @property({ render: true }) status: 'active' | 'inactive' = 'active';

    /** L'url de l'image lorsque le diaporama est inactif */
    @property({ render: true }) inactiveImageUrl?: string;

    /** Les urls des images qui défilent lors du diaporama */
    @property({ type: 'object' }) imageUrls?: string[];

    static {
        ImlSlideshow._observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const target = entry.target as ImlSlideshow;
                if (!entries[0].isIntersecting && target == ImlSlideshow._currentHoverImlSlideshow)
                    target._stopHover();
            });
        }, { root: null, threshold: 0.5 });
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
        return `<img src="${this._currentImageUrl}" alt="" loading="lazy" />`;
    }

    protected override renderUpdated() {
        this.$image = this.queryShadowSelector('img')!;
        if (this.status == 'active') {
            if (this.mode == 'hover')
                this._initHover();
            else
                this._startAutoplay();
        }
    }

    private _initHover() {
        if (this._isCoarsePointer()) {
            this.$image!.addEventListener('touchstart', () => this._startHover());
            ImlSlideshow._observer.observe(this);   // stopHover
        }
        else {
            this.$image!.addEventListener('mouseenter', () => this._startHover());
            this.$image!.addEventListener('mouseleave', () => this._stopHover());
        }
    }

    private _isCoarsePointer() {
        return window.matchMedia('(pointer: coarse)').matches;
    }

    private _startHover() {
        if (this != ImlSlideshow._currentHoverImlSlideshow) {
            ImlSlideshow._currentHoverImlSlideshow?._stopHover();
            ImlSlideshow._currentHoverImlSlideshow = this;
            this._nextImage();
            this._interval = setInterval(() => this._nextImage(), 700);
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
    }

    private _startAutoplay() {
        this._interval = setInterval(() => this._nextImage(), 700);
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
            return this.inactiveImageUrl;
        else if ((this.imageUrls?.length ?? 0) > this._indexImage)
            return this.imageUrls![this._indexImage];
        else
            return undefined;
    }

    protected override css() {
        // "display: flex;" used because space under image and height increase of 5px
        return `
        <style>
            :host {
                display: block;
            }
        
            img {
                display: flex;
                width: 100%;
                height: 100%;
            }
        </style>`;
    }
}
