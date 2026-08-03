//
//  FSModule.m
//  Wyrazowo
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(FSModule, NSObject)
  RCT_EXTERN_METHOD(saveSearchHistory:
    (NSString*)searchHistory
    resolver:(RCTPromiseResolveBlock)resolve
    rejecter:(RCTPromiseRejectBlock)reject
  )
  RCT_EXTERN_METHOD(readSearchHistory:
    (RCTPromiseResolveBlock)resolve
    rejecter:(RCTPromiseRejectBlock)reject
  )
@end
