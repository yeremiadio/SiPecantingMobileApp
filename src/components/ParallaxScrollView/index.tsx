import React, {useState, useRef, ReactNode, ReactElement} from 'react';
import {
  Animated,
  Dimensions,
  View,
  StyleSheet,
  LayoutChangeEvent,
  ScrollViewProps,
  ViewStyle,
  ScrollView,
} from 'react-native';

const window = Dimensions.get('window');

const pivotPoint = (a: number, b: number) => a - b;

const renderEmpty = () => <View />;

const noRender = () => <View style={{display: 'none'}} />;

const interpolate = (
  value: Animated.Value,
  opts: Animated.InterpolationConfigType,
) => {
  const x = value.interpolate(opts);
  (x as any).toJSON = () => (x as any).__getValue();
  return x;
};

interface ParallaxScrollViewProps extends ScrollViewProps {
  backgroundColor?: string;
  backgroundScrollSpeed?: number;
  fadeOutForeground?: boolean;
  fadeOutBackground?: boolean;
  contentBackgroundColor?: string;
  onChangeHeaderVisibility?: (isVisible: boolean) => void;
  parallaxHeaderHeight: number;
  renderBackground?: () => ReactNode;
  renderContentBackground?: () => ReactNode;
  renderFixedHeader?: () => ReactNode;
  renderForeground?: () => ReactNode;
  renderScrollComponent?: (props: ScrollViewProps) => ReactElement;
  renderStickyHeader?: () => ReactNode;
  stickyHeaderHeight?: number;
  contentContainerStyle?: ViewStyle;
  outputScaleValue?: number;
  scrollEvent?: (e: any) => void;
}

const ParallaxScrollView: React.FC<ParallaxScrollViewProps> = ({
  backgroundColor = '#000',
  backgroundScrollSpeed = 5,
  children,
  contentBackgroundColor = '#fff',
  fadeOutForeground = true,
  fadeOutBackground,
  parallaxHeaderHeight,
  renderBackground = renderEmpty,
  renderContentBackground = noRender,
  renderFixedHeader,
  renderForeground,
  renderScrollComponent = props => <Animated.ScrollView {...props} />,
  renderStickyHeader,
  stickyHeaderHeight = 0,
  style,
  contentContainerStyle,
  outputScaleValue = 5,
  scrollEvent,
  onChangeHeaderVisibility = () => {},
  ...scrollViewProps
}) => {
  const [scrollY] = useState(new Animated.Value(0));
  const [viewHeight, setViewHeight] = useState(window.height);
  const [viewWidth, setViewWidth] = useState(window.width);
  const [footerHeight, setFooterHeight] = useState(0);
  const footerComponent = useRef<View | null>(null);
  const scrollViewRef = useRef<ScrollView>();
  const onScroll = (e: any) => {
    const {
      nativeEvent: {
        contentOffset: {y: offsetY},
      },
    } = e;
    const p = pivotPoint(parallaxHeaderHeight, stickyHeaderHeight);

    if (offsetY >= p) {
      onChangeHeaderVisibility(false);
    } else {
      onChangeHeaderVisibility(true);
    }

    scrollEvent && scrollEvent(e);
  };

  const maybeUpdateViewDimensions = (e: LayoutChangeEvent) => {
    const {
      layout: {width, height},
    } = e.nativeEvent;
    if (width !== viewWidth || height !== viewHeight) {
      setViewWidth(width);
      setViewHeight(height);
    }
  };

  const renderBackgroundElement = () => {
    const p = pivotPoint(parallaxHeaderHeight, stickyHeaderHeight);
    return (
      <Animated.View
        style={[
          styles.backgroundImage,
          {
            backgroundColor: backgroundColor,
            height: parallaxHeaderHeight,
            width: viewWidth,
            opacity: fadeOutBackground
              ? interpolate(scrollY, {
                  inputRange: [0, p / 2, (p * 3) / 4, p],
                  outputRange: [1, 0.3, 0.1, 0],
                  extrapolate: 'clamp',
                })
              : 1,
            transform: [
              {
                translateY: interpolate(scrollY, {
                  inputRange: [0, p],
                  outputRange: [0, -(p / backgroundScrollSpeed)],
                  extrapolate: 'clamp',
                }),
              },
              {
                scale: interpolate(scrollY, {
                  inputRange: [-viewHeight, 0],
                  outputRange: [outputScaleValue * 1.5, 1],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}>
        <View>{renderBackground()}</View>
      </Animated.View>
    );
  };

  const renderForegroundElement = () => {
    const p = pivotPoint(parallaxHeaderHeight, stickyHeaderHeight);
    return (
      <View style={styles.parallaxHeaderContainer}>
        <Animated.View
          style={[
            styles.parallaxHeader,
            {
              height: parallaxHeaderHeight,
              opacity: fadeOutForeground
                ? interpolate(scrollY, {
                    inputRange: [0, p / 2, (p * 3) / 4, p],
                    outputRange: [1, 0.3, 0.1, 0],
                    extrapolate: 'clamp',
                  })
                : 1,
            },
          ]}>
          <View style={{height: parallaxHeaderHeight}}>
            {renderForeground && renderForeground()}
          </View>
        </Animated.View>
      </View>
    );
  };

  const wrapChildren = () => {
    const containerStyles: ViewStyle[] = [
      {backgroundColor: contentBackgroundColor},
    ];
    if (contentContainerStyle) {
      containerStyles.push(contentContainerStyle);
    }

    const handleLayout = (e: LayoutChangeEvent) => {
      const {
        layout: {height},
      } = e.nativeEvent;
      const footerHeightMat = Math.max(
        0,
        viewHeight - height - stickyHeaderHeight,
      );
      if (footerHeight !== footerHeightMat) {
        footerComponent.current?.setNativeProps({
          style: {height: footerHeight},
        });
        setFooterHeight(footerHeight);
      }
    };

    return (
      <View
        style={[containerStyles, {minHeight: viewHeight}]}
        onLayout={handleLayout}>
        {renderContentBackground()}
        {children}
      </View>
    );
  };

  const renderFooterSpacer = () => (
    <View
      ref={footerComponent}
      style={{backgroundColor: contentBackgroundColor}}
    />
  );

  const maybeRenderStickyHeader = () => {
    const p = pivotPoint(parallaxHeaderHeight, stickyHeaderHeight);
    if (renderStickyHeader || renderFixedHeader) {
      return (
        <View
          style={[
            styles.stickyHeader,
            {width: viewWidth, height: stickyHeaderHeight},
          ]}>
          {renderStickyHeader ? (
            <Animated.View
              style={{
                backgroundColor: backgroundColor,
                height: stickyHeaderHeight,
                opacity: interpolate(scrollY, {
                  inputRange: [0, p],
                  outputRange: [0, 1],
                  extrapolate: 'clamp',
                }),
              }}>
              <Animated.View
                style={{
                  transform: [
                    {
                      translateY: interpolate(scrollY, {
                        inputRange: [0, p],
                        outputRange: [stickyHeaderHeight, 0],
                        extrapolate: 'clamp',
                      }),
                    },
                  ],
                }}>
                {renderStickyHeader()}
              </Animated.View>
            </Animated.View>
          ) : null}
          {renderFixedHeader && renderFixedHeader()}
        </View>
      );
    }
    return null;
  };

  const scrollElement = renderScrollComponent({
    ...scrollViewProps,
    scrollEventThrottle: 1,
  });

  return (
    <View
      style={[style, styles.container]}
      onLayout={maybeUpdateViewDimensions}>
      {renderBackgroundElement()}
      {React.cloneElement(
        scrollElement,
        {
          ref: scrollViewRef,
          style: [styles.scrollView, scrollElement.props.style],
          onScroll: Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: true, listener: onScroll},
          ),
        },
        renderForegroundElement(),
        wrapChildren(),
        renderFooterSpacer(),
      )}
      {maybeRenderStickyHeader()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  parallaxHeaderContainer: {
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  parallaxHeader: {
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  backgroundImage: {
    position: 'absolute',
    backgroundColor: 'transparent',
    overflow: 'hidden',
    top: 0,
  },
  stickyHeader: {
    backgroundColor: 'transparent',
    position: 'absolute',
    overflow: 'hidden',
    top: 0,
    left: 0,
  },
  scrollView: {
    backgroundColor: 'transparent',
  },
});

export default ParallaxScrollView;
